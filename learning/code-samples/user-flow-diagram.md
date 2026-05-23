# ユーザーフロー図：8ステップ QR-to-Token フロー

## ステップ概要図

```
┌──────────────────────────────────────────────────────────────────────────┐
│         ユーザーが行動 → QRスキャン → トークン獲得（完全フロー）           │
└──────────────────────────────────────────────────────────────────────────┘

Step 1          Step 2          Step 3          Step 4          Step 5
────────        ────────        ────────        ────────        ────────
ユーザーが    →  QRコード      →  スキャン      →  ペイロード    →  署名
行動を実施        が生成          開始          デコード         検証
(出品など)     (フロント側)     (モバイル)      (API側)      (ECDSA)
                              ※1               ※2             ※3

Step 6          Step 7          Step 8
────────        ────────        ────────
AI判定        →  トークン      →  結果
実行            発行          表示
(4層)        (SC実行)      (画面更新)
※4             ※5             ※6
```

## 詳細フロー（序列図形式）

```
┌─────────────┐          ┌──────────────┐          ┌─────────────┐
│  ユーザー    │          │フロントエンド│          │  バックエンド│
│             │          │  (React)     │          │ (Node.js)   │
└──────┬──────┘          └──────┬───────┘          └──────┬──────┘
       │                        │                        │
       │  Step 1: 行動を実施   │                        │
       │  (出品登録など)       │                        │
       │◄──────────────────────┤                        │
       │                        │                        │
       │                        │  Step 2: QRコード生成 │
       │                        │  - event_id           │
       │                        │  - action_type        │
       │                        │  - action_id          │
       │                        │  - nonce (random)     │
       │                        │  - timestamp (ISO)    │
       │                        │  - base_tokens        │
       │                        │  ↓ base64エンコード   │
       │                        │                        │
       │  Step 3: ユーザー画面でQRを表示                │
       │◄─────────────────────QRコード───────────────────┤
       │  QRコード              │                        │
       │  スキャン実施           │                        │
       │  (カメラ/SDK)          │                        │
       │                        │  Step 4: ペイロード送信│
       │                        │  headers: {            │
       │                        │    Authorization:      │
       │                        │    Bearer {token}      │
       │                        │  }                     │
       │  payload +            │  POST /api/v1/scan-qr │
       │  signature            ├─────────────────────→  │
       │◄─────────────────────────────────────────────  │
       │                        │  Step 5: 検証開始      │
       │                        │◄──────────────────────┤
       │                        │  5a. Base64デコード    │
       │                        │  5b. JSON解析          │
       │                        │  5c. ECDSA署名検証    │
       │                        │      messageHash =    │
       │                        │      solidityKeccak256│
       │                        │      recoverAddress   │
       │                        │  5d. Nonce確認        │
       │                        │      usedNonces チェック
       │                        │                        │
       │                        │  Step 6: AI判定       │
       │                        │◄──────────────────────┤
       │                        │  Layer 1:              │
       │                        │    identity >= 0.95    │
       │                        │  Layer 2:              │
       │                        │    authenticity >= 0.85
       │                        │  Layer 3:              │
       │                        │    isolationScore      │
       │                        │    1.0 ～ 2.0x        │
       │                        │  Layer 4:              │
       │                        │    risk detection      │
       │                        │  All条件満たす?         │
       │                        │  ├─ YES → 続行         │
       │                        │  └─ NO → エラー応答    │
       │                        │                        │
       │                        │  Step 7: トークン発行│
       │                        │◄──────────────────────┤
       │                        │  Web3.js mintTokens()│
       │                        │  to: 0x1a2b3c...      │
       │                        │  amount: base_tokens × │
       │                        │          isolation     │
       │                        │  Polygon Testnet      │
       │                        │  TX: 0xabcd...        │
       │                        │  Confirmation: 3.2s   │
       │                        │                        │
       │                        │  Step 8: 結果応答    │
       │                        │  {                     │
       │                        │    status: "success"   │
       │                        │    tokens_awarded:     │
       │                        │      total: 25        │
       │                        │    transaction_hash    │
       │                        │    ai_scores: {...}   │
       │  API応答受信           │  }                     │
       │◄────────────────────JSON──────────────────────  │
       │  (tokens_awarded,      │                        │
       │   ai_scores,           │                        │
       │   txHash)              │                        │
       │                        │                        │
       │  Step 8b: UI更新       │                        │
       │  - userStats更新       │                        │
       │  - scanResult表示      │                        │
       │  - result msgアニメーション
       │                        │                        │
       │  ✅ 成功！              │                        │
       │  △ トークン獲得完了     │                        │
       │                        │                        │
```

## ステップ詳細説明

### Step 1: ユーザーが行動を実施
**ユーザー側の処理**
- 出品登録、SNS投稿、推薦、出席など、システムが認識する「行動」を実施
- 行動のタイプ、タイムスタンプ、base_tokensが決定される

**該当アクション種別**:
```
action_type: "item_registration"    (基本: 20トークン)
action_type: "sns_post"             (基本: 15トークン)
action_type: "recommendation"       (基本: 10トークン)
action_type: "attendance"           (基本: 5トークン)
action_type: "support"              (基本: 8トークン)
```

---

### Step 2: QRコード生成
**フロントエンド（またはバックエンド）が生成**

QRペイロード構造:
```json
{
  "event_id": "furima_2026_okinawa",
  "action_type": "item_registration",
  "action_id": "act_1715432567890",
  "base_tokens": 20,
  "nonce": "0x3f8a92b1c...",
  "timestamp": "2026-05-10T10:30:45.123Z"
}
```

**生成処理**:
1. JSONを文字列化
2. Base64エンコード
3. QRコード画像生成（QRコードライブラリ）
4. ユーザー画面に表示

---

### Step 3: ユーザーがQRをスキャン
**モバイル側の処理**

- ユーザーがスマートフォンのカメラを使用してQRコードを読み込み
- QRコード読み込みSDK（ZXing, react-qr-reader等）がペイロード抽出
- 抽出データ = Step 2 の base64文字列

**セキュリティ考慮**:
- QRコード自体は暗号化されていない（署名で保護）
- ペイロード確認用にして、署名で認証

---

### Step 4: ペイロード + 署名をサーバーへ送信
**フロントエンドが POST リクエスト実行**

```javascript
const payload = btoa(JSON.stringify({...}));  // Base64
const signature = await signWithUserKey(payload);  // ECDSA署名

fetch('/api/v1/scan-qr', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + authToken
  },
  body: JSON.stringify({
    qr_payload: payload,           // Base64エンコード済みJSON
    user_id: "0x1234...",          // ユーザーウォレットアドレス
    user_signature: signature,     // ECDSA署名（16進数）
    device_id: "device_abc...",    // デバイス識別子
    timestamp: new Date().toISOString()
  })
});
```

---

### Step 5a: Base64デコード & ペイロード検証
**APIサーバー側の処理開始**

```javascript
// Step 5a: Base64デコード
const payload = JSON.parse(
  Buffer.from(qr_payload, 'base64').toString('utf-8')
);
// → { event_id, action_type, action_id, nonce, timestamp, base_tokens }

// Step 5b: スキーマ検証
if (!payload.event_id || !payload.action_type) {
  return res.status(400).json({
    status: 'rejected',
    reason: 'invalid_qr_payload'
  });
}

// Step 5c: タイムスタンプ検証（±3分）
const timeDiff = Math.abs(Date.now() - new Date(payload.timestamp).getTime());
if (timeDiff > 3 * 60 * 1000) {
  return res.status(400).json({
    status: 'rejected',
    reason: 'payload_expired'
  });
}
```

---

### Step 5d: ECDSA署名検証
**暗号学的な本人確認**

```javascript
const messageHash = ethers.utils.solidityKeccak256(
  ['address', 'string', 'string', 'uint256'],
  [user_id, payload.action_type, payload.action_id, payload.nonce || 0]
);

const signer = ethers.utils.recoverAddress(messageHash, user_signature);

if (signer.toLowerCase() !== user_id.toLowerCase()) {
  return res.status(401).json({
    status: 'rejected',
    reason: 'signature_verification_failed'
  });
}
```

**何を検証しているのか**:
- ペイロードが改ざんされていないか
- 署名がuser_idの秘密鍵で生成されたか
- user_id（ウォレットアドレス）が正当なものか

---

### Step 5e: Nonce二重使用防止
**リプレイ攻撃対策**

```javascript
const usedNonces = new Set();  // 本番ではDB

const nonceKey = `${user_id}:${payload.nonce}`;
if (usedNonces.has(nonceKey)) {
  return res.status(409).json({
    status: 'rejected',
    reason: 'nonce_already_used',
    detail: 'このQRコードは既に使用されています'
  });
}

// 後で実行:
usedNonces.add(nonceKey);
```

---

### Step 6: AI判定エンジン（4層）
**スマートコントラクト実行前の最後の審査**

```javascript
const aiResult = await aiEngine.runFullJudgment({
  ...payload,
  user_id,
  device_id,
  timestamp
});
```

**Layer 1: Identity Verification （本人確認）**
- deviceMatch: device_id が存在 → 0.3点
- signatureMatch: 署名検証成功 → 0.65点
- 合計: 0.0～1.0
- **判定**: >= 0.95 で合格

**Layer 2: Authenticity Check （真正性）**
- payloadIntegrity: nonce存在 → 0.4点
- timestampValidity: ±3分以内 → 0.45点
- 合計: 0.0～1.0
- **判定**: >= 0.85 で合格

**Layer 3: Isolation Score Calculation （孤立スコア乗数）**
- socialEngagement (社会的関与): 0.35
- communityParticipation (コミュニティ参加): 0.28
- creditAccumulation (信用蓄積): 0.25
- **倍率**: 1.0 + (0.35 + 0.28 + 0.25) = 1.88x

**Layer 4: Risk Detection （リスク検出）**
- 不正パターン検出（同一ユーザー短時間複数スキャン等）
- **判定**: safe: true/false

**最終判定**:
```javascript
const passed = 
  identity >= 0.95 &&        // Layer 1合格
  authenticity >= 0.85 &&    // Layer 2合格
  riskDetection.safe;        // Layer 4合格
  // isolationScore は倍率として使用（3.0以上は通常ない）
```

AI判定に失敗した場合の応答:
```json
{
  "status": "rejected",
  "reason": "ai_judgment_failed",
  "detail": "Identity: 0.65, Authenticity: 0.82",
  "suggested_action": "support_ticket_creation"
}
```

---

### Step 7: スマートコントラクト実行 - トークン発行
**AIが合格したら、ブロックチェーンにミント**

```solidity
// Solidity smart contract
function mintTokens(
    address _user,
    string calldata _actionType,
    string calldata _actionId,
    uint256 _nonce,
    bytes calldata _signature
) external onlyRole(MINTER_ROLE) nonReentrant returns (uint256)
```

**処理フロー**:

1. **nonce再確認** (二重チェック)
   ```solidity
   require(_nonce == userNonces[_user], "Invalid nonce");
   ```

2. **署名再検証** (ブロックチェーン側)
   ```solidity
   bytes32 messageHash = keccak256(
       abi.encodePacked(_user, _actionType, _actionId, _nonce)
   );
   address signer = messageHash.toEthSignedMessageHash().recover(_signature);
   require(signer == _user, "Invalid signature");
   ```

3. **既使用チェック**
   ```solidity
   bytes32 actionHash = keccak256(abi.encodePacked(_actionId));
   require(!usedActionIds[actionHash], "Action ID already used");
   ```

4. **報酬計算**
   ```solidity
   uint256 baseReward = baseTokenRewards[_actionType];  // 20など
   uint256 multiplier = isolationScoreMultiplier[_user];  // 1.88 → 188
   uint256 finalAmount = (baseReward * multiplier) / 100;  // (20*188)/100 = 37
   ```

5. **ミント実行**
   ```solidity
   _mint(_user, finalAmount);
   usedActionIds[actionHash] = true;
   userNonces[_user]++;
   emit TokensMinted(_user, _actionType, baseReward, finalAmount, _actionId);
   ```

**トランザクション確認**:
- ガス消費: ~150,000-300,000 (Polygon)
- 確認時間: 3-5秒 (Polygon Testnet)
- トランザクションハッシュ: `0xabcd1234...`

---

### Step 8: 結果をフロントエンドに応答
**成功応答の完全形**

```json
{
  "status": "success",
  "action_id": "act_1715432567890",
  "tokens_awarded": {
    "participation_token": 20,
    "isolation_adjustment": "1.88",
    "total_multiplied": 37
  },
  "transaction_hash": "0xabcd1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  "blockchain_confirmation_time": "3.2 seconds",
  "user_isolation_score_new": "1.88",
  "ai_scores": {
    "identity": "0.98",
    "authenticity": "0.92",
    "risk_detection": {
      "safe": true,
      "riskScore": 0.05,
      "details": []
    }
  },
  "message": "出品登録成功！37トークンを獲得しました"
}
```

**フロントエンド側 UI更新**:

```javascript
// Step 8: 結果表示
if (data.status === 'success') {
  // ポンチ絵モード
  setScanResult(data);
  setUserStats(prev => ({
    ...prev,
    balance: prev.balance + data.tokens_awarded.total_multiplied,
    totalEarnings: prev.totalEarnings + data.tokens_awarded.total_multiplied
  }));
  
  // 画面に表示
  // ✅ 成功！
  // 37 トークンを獲得しました
  // 報酬倍率: 1.88x
}
```

---

## エラーケース：フロー分岐

```
各ステップでのエラー判定と対応：

Step 5: ペイロード検証失敗
└─→ invalid_qr_payload
    └─→ 「QRコードが破損しています」

Step 5: ECDSA署名検証失敗
└─→ signature_verification_failed
    └─→ 「本人確認に失敗しました」

Step 5: Nonce重複
└─→ nonce_already_used
    └─→ 「このQRコードは既に使用されています」

Step 6: AI判定失敗
└─→ ai_judgment_failed (identity or authenticity or risk)
    └─→ 「本人確認の信頼度が不足しています」
    └─→ suggested_action: support_ticket_creation

Step 7: スマートコントラクト実行失敗
└─→ コントラクトエラー
    └─→ （稀、APIで事前チェック）
```

---

## フロー時間測定

```
Step 1: ユーザー行動実施     ~随時
Step 2: QRコード生成         ~100ms
Step 3: スキャン             ~1-3秒
Step 4: サーバー送信         ~100ms
Step 5: 検証処理             ~200-500ms
  5a. デコード・パース        ~20ms
  5b. スキーマ検証           ~10ms
  5c. 署名検証               ~150ms (ECDSA)
  5d. Nonce確認             ~50ms
Step 6: AI判定エンジン       ~500-1000ms
Step 7: SC実行＋確認         ~3-5秒
Step 8: 応答受信＋UI更新     ~100-200ms

合計: 約 5-9秒 (Polygon Testnet)
```

---

## 成功パス vs エラーパス

### 成功パス時間
```
QRスキャン (3秒)
  ↓
API検証 + AI判定 (1秒)
  ↓
スマートコントラクト実行 (3-5秒)
  ↓
UI更新 (即座)

👍 合計: 5-9秒でトークン獲得可能
```

### エラーパス時間
```
QRスキャン (3秒)
  ↓
API検証で失敗 (0.5秒)
  ↓
エラーメッセージ表示 (即座)

⚠️ 合計: 3-4秒でエラー判明
```
