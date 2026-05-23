/**
 * Okinawa文芸フリマ QR-to-Token API Server
 * Node.js + Express
 *
 * POST /api/v1/scan-qr: QRスキャン結果の処理
 * GET  /api/v1/user/{userId}/tokens: ユーザートークン残高確認
 * GET  /api/v1/user/{userId}/isolation-score: 孤立スコア確認
 */

const express = require('express');
const Web3 = require('web3');
const { ethers } = require('ethers');
const crypto = require('crypto');

const app = express();
app.use(express.json());

// Web3初期化（Polygon Testnet）
const web3 = new Web3('https://rpc-mumbai.maticvigil.com');

// スマートコントラクト設定
const CONTRACT_ADDRESS = '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p'; // デプロイ後に設定
const CONTRACT_ABI = [
    {
        "inputs": [
            { "internalType": "address", "name": "_user", "type": "address" },
            { "internalType": "string", "name": "_actionType", "type": "string" },
            { "internalType": "string", "name": "_actionId", "type": "string" },
            { "internalType": "uint256", "name": "_nonce", "type": "uint256" },
            { "internalType": "bytes", "name": "_signature", "type": "bytes" }
        ],
        "name": "mintTokens",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

// AI判定エンジン（本番ではML APIに置き換え）
class AIJudgmentEngine {
    /**
     * 4層判定パイプライン
     */
    async runFullJudgment(payload) {
        const identity = await this.identityVerification(payload);
        const authenticity = await this.authenticityCheck(payload);
        const isolationScore = await this.isolationScoreCalculation(payload.user_id);
        const riskDetection = await this.riskDetection(payload);

        return {
            passed: identity >= 0.95 && authenticity >= 0.85 && riskDetection.safe,
            scores: {
                identity,
                authenticity,
                isolationScore,
                riskDetection
            }
        };
    }

    /**
     * Layer 1: 本人確認スコア（0.0～1.0）
     */
    async identityVerification(payload) {
        // デバイスID + ユーザーシグネチャの交差検証
        const deviceMatch = payload.device_id ? 0.3 : 0.0;
        const signatureMatch = payload.user_signature ? 0.65 : 0.0;
        return Math.min(1.0, deviceMatch + signatureMatch);
    }

    /**
     * Layer 2: 真正性スコア（0.0～1.0）
     */
    async authenticityCheck(payload) {
        // QRペイロードの整合性、タイムスタンプ、nonce検証
        const payloadIntegrity = payload.nonce ? 0.4 : 0.0;
        const timestamp = Math.abs(Date.now() - new Date(payload.timestamp).getTime());
        const timestampValidity = timestamp < 3 * 60 * 1000 ? 0.45 : 0.0; // ±3分
        return Math.min(1.0, payloadIntegrity + timestampValidity);
    }

    /**
     * Layer 3: 孤立スコア乗数計算（1.0～2.0x）
     */
    async isolationScoreCalculation(userId) {
        // 実装では DB から取得
        // 社会的関与 40% + コミュニティ参加 30% + 信用蓄積 30%
        const socialEngagement = 0.35;
        const communityParticipation = 0.28;
        const creditAccumulation = 0.25;

        const totalScore = socialEngagement + communityParticipation + creditAccumulation;
        return 1.0 + totalScore; // 1.0～2.0の範囲
    }

    /**
     * Layer 4: リスク検出
     */
    async riskDetection(payload) {
        // 不正パターン検出（同一ユーザーの短時間複数スキャンなど）
        return {
            safe: true,
            riskScore: 0.05,
            details: []
        };
    }
}

const aiEngine = new AIJudgmentEngine();

// ==================== エンドポイント ====================

/**
 * POST /api/v1/scan-qr
 * QRコード読み込み後の統合処理
 */
app.post('/api/v1/scan-qr', async (req, res) => {
    try {
        const { qr_payload, user_id, user_signature, device_id, timestamp } = req.body;

        // 入力検証
        if (!qr_payload || !user_id || !user_signature) {
            return res.status(400).json({
                status: 'rejected',
                reason: 'missing_required_fields',
                detail: 'qr_payload, user_id, user_signature are required'
            });
        }

        // Step 1: QRペイロードデコード
        let payload;
        try {
            payload = JSON.parse(Buffer.from(qr_payload, 'base64').toString('utf-8'));
        } catch (e) {
            return res.status(400).json({
                status: 'rejected',
                reason: 'invalid_qr_payload',
                detail: 'QRペイロードがBase64デコード不可'
            });
        }

        // Step 2: ユーザー署名検証（ECDSA）
        const messageHash = ethers.utils.solidityKeccak256(
            ['address', 'string', 'string', 'uint256'],
            [user_id, payload.action_type, payload.action_id, payload.nonce || 0]
        );

        let signer;
        try {
            signer = ethers.utils.recoverAddress(messageHash, user_signature);
        } catch (e) {
            return res.status(401).json({
                status: 'rejected',
                reason: 'signature_verification_failed',
                detail: 'ユーザー署名の検証に失敗'
            });
        }

        if (signer.toLowerCase() !== user_id.toLowerCase()) {
            return res.status(401).json({
                status: 'rejected',
                reason: 'signature_mismatch',
                detail: 'ユーザー署名がuser_idと一致しない'
            });
        }

        // Step 3: nonce検証（二重スキャン防止）
        // 本番では DB で管理
        const usedNonces = new Set(); // 簡易実装
        if (usedNonces.has(`${user_id}:${payload.nonce}`)) {
            return res.status(409).json({
                status: 'rejected',
                reason: 'nonce_already_used',
                detail: 'このQRコードは既に使用されています'
            });
        }

        // Step 4: AI判定エンジン呼び出し
        const aiResult = await aiEngine.runFullJudgment({
            ...payload,
            user_id,
            device_id,
            timestamp
        });

        if (!aiResult.passed) {
            return res.status(403).json({
                status: 'rejected',
                reason: 'ai_judgment_failed',
                detail: `Identity: ${aiResult.scores.identity.toFixed(2)}, Authenticity: ${aiResult.scores.authenticity.toFixed(2)}`,
                action_id: payload.action_id,
                suggested_action: 'support_ticket_creation'
            });
        }

        // Step 5: スマートコントラクト実行（トークンミント）
        const tokensAwarded = Math.floor(
            (payload.base_tokens || 10) * aiResult.scores.isolationScore
        );

        // 本番では実際に Web3 コントラクト呼び出し
        // const tx = await contract.methods.mintTokens(
        //     user_id,
        //     payload.action_type,
        //     payload.action_id,
        //     payload.nonce,
        //     user_signature
        // ).send({ from: minterAddress, gas: 300000 });

        // デモ用トランザクションハッシュ生成
        const transactionHash = '0x' + crypto.randomBytes(32).toString('hex');

        // Step 6: API応答返却
        usedNonces.add(`${user_id}:${payload.nonce}`);

        return res.status(200).json({
            status: 'success',
            action_id: payload.action_id,
            tokens_awarded: {
                participation_token: payload.base_tokens || 10,
                isolation_adjustment: aiResult.scores.isolationScore.toFixed(2),
                total_multiplied: tokensAwarded
            },
            transaction_hash: transactionHash,
            blockchain_confirmation_time: '3.2 seconds',
            user_isolation_score_new: aiResult.scores.isolationScore.toFixed(2),
            ai_scores: {
                identity: aiResult.scores.identity.toFixed(2),
                authenticity: aiResult.scores.authenticity.toFixed(2),
                risk_detection: aiResult.scores.riskDetection
            },
            message: `出品登録成功！${tokensAwarded}トークンを獲得しました`
        });

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({
            status: 'error',
            detail: 'Internal server error',
            error_code: 'INTERNAL_ERROR'
        });
    }
});

/**
 * GET /api/v1/user/{userId}/tokens
 * ユーザーのトークン残高取得
 */
app.get('/api/v1/user/:userId/tokens', async (req, res) => {
    try {
        const { userId } = req.params;

        // 本番では Web3 で balanceOf を呼び出し
        // const balance = await contract.methods.balanceOf(userId).call();

        const balance = Math.floor(Math.random() * 500);

        return res.json({
            status: 'success',
            user_id: userId,
            balance: balance,
            token_symbol: 'OKNT',
            last_updated: new Date().toISOString()
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            detail: error.message
        });
    }
});

/**
 * GET /api/v1/user/{userId}/isolation-score
 * 孤立スコア確認
 */
app.get('/api/v1/user/:userId/isolation-score', async (req, res) => {
    try {
        const { userId } = req.params;

        const isolationScore = 1.0 + Math.random() * 1.0; // 1.0～2.0

        return res.json({
            status: 'success',
            user_id: userId,
            isolation_score_multiplier: isolationScore.toFixed(2),
            components: {
                social_engagement: 0.35,
                community_participation: 0.28,
                credit_accumulation: 0.25
            },
            last_updated: new Date().toISOString()
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            detail: error.message
        });
    }
});

// ==================== サーバー起動 ====================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`QR-to-Token API Server listening on port ${PORT}`);
    console.log(`Smart Contract Address: ${CONTRACT_ADDRESS}`);
    console.log(`Network: Polygon Testnet (Mumbai)`);
});
