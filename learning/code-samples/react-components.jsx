/**
 * Okinawa文芸フリマ QR-to-Token React双層UIコンポーネント
 *
 * 2層構成：
 * 1. ポンチ絵モード（意思決定者向け）: シンプルで直感的
 * 2. 詳細インフォグラフィックモード（学習者向け）: 詳細な情報と数字
 *
 * レスポンシブ対応：モバイルファースト、768pxブレークポイント
 */

import React, { useState, useEffect } from 'react';
import './QRTokenComponent.css';

// ==================== メインコンポーネント ====================

export const QRTokenComponent = ({ userId, authToken }) => {
    const [displayMode, setDisplayMode] = useState('ponchi'); // 'ponchi' or 'detailed'
    const [scanResult, setScanResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userStats, setUserStats] = useState({
        balance: 0,
        isolationScore: 1.0,
        totalEarnings: 0
    });

    // ユーザー統計情報の取得
    useEffect(() => {
        fetchUserStats();
    }, [userId]);

    const fetchUserStats = async () => {
        try {
            const [tokensRes, scoreRes] = await Promise.all([
                fetch(`/api/v1/user/${userId}/tokens`, {
                    headers: { 'Authorization': `Bearer ${authToken}` }
                }),
                fetch(`/api/v1/user/${userId}/isolation-score`, {
                    headers: { 'Authorization': `Bearer ${authToken}` }
                })
            ]);

            const tokensData = await tokensRes.json();
            const scoreData = await scoreRes.json();

            setUserStats({
                balance: tokensData.balance || 0,
                isolationScore: parseFloat(scoreData.isolation_score_multiplier) || 1.0,
                totalEarnings: tokensData.balance || 0
            });
        } catch (error) {
            console.error('Error fetching user stats:', error);
        }
    };

    const handleQRScan = async (qrPayload, signature) => {
        setLoading(true);
        try {
            const response = await fetch('/api/v1/scan-qr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    qr_payload: qrPayload,
                    user_id: userId,
                    user_signature: signature,
                    device_id: 'device_' + Math.random().toString(36).substr(2, 9),
                    timestamp: new Date().toISOString()
                })
            });

            const data = await response.json();
            setScanResult(data);

            if (data.status === 'success') {
                // 統計情報を更新
                setUserStats(prev => ({
                    ...prev,
                    balance: prev.balance + data.tokens_awarded.total_multiplied,
                    totalEarnings: prev.totalEarnings + data.tokens_awarded.total_multiplied
                }));
            }
        } catch (error) {
            setScanResult({
                status: 'error',
                detail: error.message
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="qr-token-component">
            {/* トグルボタン */}
            <div className="display-mode-toggle">
                <button
                    className={`toggle-btn ${displayMode === 'ponchi' ? 'active' : ''}`}
                    onClick={() => setDisplayMode('ponchi')}
                >
                    📊 ポンチ絵
                </button>
                <button
                    className={`toggle-btn ${displayMode === 'detailed' ? 'active' : ''}`}
                    onClick={() => setDisplayMode('detailed')}
                >
                    📈 詳細
                </button>
            </div>

            {/* 2層表示の切り替え */}
            {displayMode === 'ponchi' ? (
                <PonchiEMode
                    userStats={userStats}
                    scanResult={scanResult}
                    loading={loading}
                    onQRScan={handleQRScan}
                />
            ) : (
                <DetailedMode
                    userStats={userStats}
                    scanResult={scanResult}
                    loading={loading}
                    onQRScan={handleQRScan}
                />
            )}
        </div>
    );
};

// ==================== ポンチ絵モード（意思決定者向け） ====================

const PonchiEMode = ({ userStats, scanResult, loading, onQRScan }) => {
    return (
        <div className="ponchi-mode">
            <div className="stats-overview">
                <div className="stat-card">
                    <div className="stat-value">{userStats.balance}</div>
                    <div className="stat-label">獲得トークン</div>
                    <div className="stat-icon">🪙</div>
                </div>

                <div className="stat-card highlight">
                    <div className="stat-value">{userStats.isolationScore.toFixed(1)}x</div>
                    <div className="stat-label">報酬倍率</div>
                    <div className="stat-icon">⚡</div>
                </div>

                <div className="stat-card">
                    <div className="stat-value">¥{Math.floor(userStats.totalEarnings * 100)}</div>
                    <div className="stat-label">換金可能額</div>
                    <div className="stat-icon">💰</div>
                </div>
            </div>

            {/* QRスキャンシミュレータ */}
            <div className="qr-scanner-simple">
                <h2>📱 QRをスキャン</h2>
                <button
                    className="scan-button"
                    disabled={loading}
                    onClick={() => {
                        // デモ用のシミュレーション
                        onQRScan(
                            btoa(JSON.stringify({
                                event_id: 'furima_2026_okinawa',
                                action_type: 'item_registration',
                                action_id: 'act_' + Date.now(),
                                timestamp: new Date().toISOString(),
                                nonce: Math.random().toString(36),
                                base_tokens: 20
                            })),
                            '0x' + 'a'.repeat(130)
                        );
                    }}
                >
                    {loading ? '処理中...' : 'スキャンをシミュレート'}
                </button>
            </div>

            {/* 結果表示 */}
            {scanResult && (
                <div className={`result-message ${scanResult.status}`}>
                    {scanResult.status === 'success' ? (
                        <>
                            <h3>✅ 成功！</h3>
                            <p>
                                <strong>{scanResult.tokens_awarded.total_multiplied}</strong> トークンを獲得しました
                            </p>
                            <p className="multiplier">
                                報酬倍率: <strong>{scanResult.tokens_awarded.isolation_adjustment}x</strong>
                            </p>
                        </>
                    ) : (
                        <>
                            <h3>❌ エラー</h3>
                            <p>{scanResult.detail || scanResult.reason}</p>
                        </>
                    )}
                </div>
            )}

            {/* 簡易説明 */}
            <div className="explanation-box">
                <h3>仕組み</h3>
                <ul>
                    <li>📝 出品登録・SNS投稿などの行動</li>
                    <li>📲 QRコードをスキャン</li>
                    <li>✅ AI判定で本人確認</li>
                    <li>💎 トークン自動獲得</li>
                    <li>💵 いつでも換金可能</li>
                </ul>
            </div>
        </div>
    );
};

// ==================== 詳細モード（学習者向け） ====================

const DetailedMode = ({ userStats, scanResult, loading, onQRScan }) => {
    return (
        <div className="detailed-mode">
            {/* 統計ダッシュボード */}
            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h3>📊 トークン獲得履歴</h3>
                    <div className="chart-placeholder">
                        <svg viewBox="0 0 200 100" className="mini-chart">
                            <rect x="10" y="40" width="20" height="50" fill="#4CAF50" />
                            <rect x="40" y="20" width="20" height="70" fill="#4CAF50" />
                            <rect x="70" y="60" width="20" height="30" fill="#4CAF50" />
                            <rect x="100" y="30" width="20" height="60" fill="#4CAF50" />
                            <rect x="130" y="10" width="20" height="80" fill="#4CAF50" />
                            <rect x="160" y="50" width="20" height="40" fill="#4CAF50" />
                        </svg>
                    </div>
                    <p className="chart-label">過去30日間の獲得トークン数</p>
                </div>

                <div className="dashboard-card">
                    <h3>⚡ スコア詳細</h3>
                    <div className="score-breakdown">
                        <div className="score-row">
                            <span>本人確認度</span>
                            <div className="score-bar">
                                <div className="score-fill" style={{ width: '98%' }}></div>
                            </div>
                            <span className="score-percent">98%</span>
                        </div>
                        <div className="score-row">
                            <span>真正性確認</span>
                            <div className="score-bar">
                                <div className="score-fill" style={{ width: '92%' }}></div>
                            </div>
                            <span className="score-percent">92%</span>
                        </div>
                        <div className="score-row">
                            <span>報酬倍率</span>
                            <div className="score-bar">
                                <div className="score-fill" style={{ width: `${userStats.isolationScore * 50}%` }}></div>
                            </div>
                            <span className="score-percent">{userStats.isolationScore.toFixed(2)}x</span>
                        </div>
                    </div>
                </div>

                <div className="dashboard-card">
                    <h3>💡 報酬計算</h3>
                    <div className="calculation-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>アクション</th>
                                    <th>基本</th>
                                    <th>倍率</th>
                                    <th>獲得</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>出品登録</td>
                                    <td>20</td>
                                    <td>{userStats.isolationScore.toFixed(2)}x</td>
                                    <td>{Math.floor(20 * userStats.isolationScore)}</td>
                                </tr>
                                <tr>
                                    <td>SNS投稿</td>
                                    <td>15</td>
                                    <td>{userStats.isolationScore.toFixed(2)}x</td>
                                    <td>{Math.floor(15 * userStats.isolationScore)}</td>
                                </tr>
                                <tr>
                                    <td>推薦</td>
                                    <td>10</td>
                                    <td>{userStats.isolationScore.toFixed(2)}x</td>
                                    <td>{Math.floor(10 * userStats.isolationScore)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="dashboard-card">
                    <h3>🔗 ネットワーク効果</h3>
                    <div className="network-info">
                        <p>
                            あなたの参加により、沖縄全体のトークン流通が
                            <strong>月¥{(Math.random() * 1000 + 500).toFixed(0)}</strong>
                            増加します
                        </p>
                        <p className="network-impact">
                            これは地域経済全体への貢献を可視化したものです
                        </p>
                    </div>
                </div>
            </div>

            {/* 詳細なQRスキャン */}
            <div className="detailed-scanner">
                <h2>📱 詳細QRスキャン処理</h2>
                <div className="processing-steps">
                    <div className="step">
                        <span className="step-number">1</span>
                        <span className="step-name">QRデコード</span>
                        <span className="step-icon">✓</span>
                    </div>
                    <div className="step">
                        <span className="step-number">2</span>
                        <span className="step-name">署名検証</span>
                        <span className="step-icon">✓</span>
                    </div>
                    <div className="step">
                        <span className="step-number">3</span>
                        <span className="step-name">AI判定</span>
                        <span className="step-icon">⏳</span>
                    </div>
                    <div className="step">
                        <span className="step-number">4</span>
                        <span className="step-name">トークン発行</span>
                        <span className="step-icon">⏸</span>
                    </div>
                </div>

                <button
                    className="detailed-scan-button"
                    disabled={loading}
                    onClick={() => {
                        onQRScan(
                            btoa(JSON.stringify({
                                event_id: 'furima_2026_okinawa',
                                action_type: 'sns_post',
                                action_id: 'act_' + Date.now(),
                                timestamp: new Date().toISOString(),
                                nonce: Math.random().toString(36),
                                base_tokens: 15
                            })),
                            '0x' + 'b'.repeat(130)
                        );
                    }}
                >
                    {loading ? '処理中...' : '詳細スキャン実行'}
                </button>
            </div>

            {/* 詳細な結果表示 */}
            {scanResult && (
                <div className={`detailed-result ${scanResult.status}`}>
                    <h3>スキャン結果詳細</h3>
                    {scanResult.status === 'success' && (
                        <div className="success-details">
                            <table>
                                <tr>
                                    <td>基本トークン</td>
                                    <td className="value">{scanResult.tokens_awarded.participation_token}</td>
                                </tr>
                                <tr>
                                    <td>倍率</td>
                                    <td className="value">{scanResult.tokens_awarded.isolation_adjustment}x</td>
                                </tr>
                                <tr className="total-row">
                                    <td>実際の獲得</td>
                                    <td className="value">{scanResult.tokens_awarded.total_multiplied}</td>
                                </tr>
                                <tr>
                                    <td>トランザクションハッシュ</td>
                                    <td className="value hash">{scanResult.transaction_hash.slice(0, 12)}...</td>
                                </tr>
                                <tr>
                                    <td>確認時間</td>
                                    <td className="value">{scanResult.blockchain_confirmation_time}</td>
                                </tr>
                            </table>

                            <div className="ai-scores">
                                <h4>AI判定スコア</h4>
                                <div className="score-item">
                                    <span>本人確認</span>
                                    <span>{(scanResult.ai_scores.identity * 100).toFixed(0)}%</span>
                                </div>
                                <div className="score-item">
                                    <span>真正性</span>
                                    <span>{(scanResult.ai_scores.authenticity * 100).toFixed(0)}%</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default QRTokenComponent;
