# 沖縄文芸フリマ実験プロトタイプ設計：統合仕様書

**バージョン**: 1.0  
**対象時期**: 2026年8月～12月（沖縄文芸フリマパイロット）  
**ブロックチェーン**: Polygon Testnet（2026）→ Solana Mainnet（2027以降）  
**人生科モジュール**: Module 6 - 価値流通の実装実験  
**最終更新**: 2026-05-08

---

## 第1部：基盤設計

---

## 1. システム概要

### 1.1 目的
「知識・スキル・文化」を **トークン化** し、リアルタイムで価値流通させるシステムの実装実験。参加者の「参加行為」（出品登録、SNS投稿、推薦など）を QRコードスキャン経由で検証し、ブロックチェーン上で自動的にトークンを発行・記録。

### 1.2 実験コンテキスト
- **人生科との連携**: モジュール2（AI予測）→ モジュール5（ブロックチェーン経済）の理論を、現実の文芸フリマで実装
- **学習プラットフォーム統合**: このドキュメント自体が「人生科 Module 6」として Stripe 有料メンバーシップの一部
- **参加者層**: 沖縄文芸フリマの出品者・購入者・運営スタッフ（推定100-200名）

### 1.3 主な特徴
- **ゼロトラスト検証**: AI が本人確認 + 行為の真正性を自動判定
- **即座性**: QRスキャン後 3～5秒でトークン発行完了
- **透明性**: 全トランザクション履歴が改ざん不可能に記録
- **オフライン対応**: 沖縄のインターネット環境を想定した事後同期設計

---

## 2. システムアーキテクチャ全体図

```
┌─────────────────────────────────────────────────────────────────┐
│ ユーザーフロー                                                   │
└─────────────────────────────────────────────────────────────────┘

参加者の行為（出品登録、SNS投稿、推薦）
        ↓
    ユニークQRコード生成
    （1行為 = 1QRコード、nonce付き）
        ↓
スマートフォンでQRスキャン
        ↓
┌─────────────────────────────────────────────────────────────────┐
│ APIサーバー層                                                    │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ 1. リクエスト受信 (POST /api/v1/scan-qr)                   ││
│ │    - qr_payload, user_id, user_signature, device_id        ││
│ └─────────────────────────────────────────────────────────────┘│
│                          ↓                                      │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ 2. ユーザー署名検証                                          ││
│ │    - ウォレット署名が有効か（ECDSA）                        ││
│ │    - デバイスIDが登録済みか                                  ││
│ │    - タイムスタンプが有効範囲か（±3分）                    ││
│ └─────────────────────────────────────────────────────────────┘│
│                          ↓                                      │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ 3. QRペイロードデコード＆検証                               ││
│ │    - nonce が使用済みでないか                              ││
│ │    - イベントID が正しいか                                  ││
│ │    - action_type が有効か                                   ││
│ └─────────────────────────────────────────────────────────────┘│
│                          ↓                                      │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ 4. AI判定エンジン呼び出し（4層パイプライン）                ││
│ │    - Layer 1: 本人確認スコア ≥ 0.95                       ││
│ │    - Layer 2: 行為の真正性スコア ≥ 0.85                   ││
│ │    - Layer 3: 孤立スコア計算（1.0～2.0x乗数）             ││
│ │    - Layer 4: リスク検出（不正パターン）                    ││
│ └─────────────────────────────────────────────────────────────┘│
│                          ↓                                      │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ 5. 重複チェック＆時間制限検証                               ││
│ │    - 同じ user_id + action_type の過去記録確認             ││
│ │    - 時間間隔チェック（例：1分以内に2回不可）              ││
│ └─────────────────────────────────────────────────────────────┘│
│                          ↓                                      │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ 6. トークン数決定＆ブロックチェーン実行                      ││
│ │    - 基本トークン数（action_type別）                        ││
│ │    - 孤立スコア乗数を適用                                    ││
│ │    - スマートコントラクト: mintTokens()実行                 ││
│ └─────────────────────────────────────────────────────────────┘│
│                          ↓                                      │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ 7. API応答返却                                              ││
│ │    {status: "success", tokens_awarded, transaction_hash}   ││
│ └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
        ↓
確認画面表示（獲得トークン数、孤立スコア補正率など）
        ↓
ブロックチェーン上に永続記録（Polygon Testnet）
```

---

## 3. ステークホルダーと役割

| 役割 | 責務 | 例 |
|------|------|-----|
| **参加者** | QRスキャン、行為の実行、トークン獲得 | 出品者、来場者、SNS投稿者 |
| **AI判定エンジン** | 本人確認、真正性判定、スコア計算 | 外部 ML サービス（オンプレミス可能） |
| **スマートコントラクト** | トークン発行記録、改ざん防止 | Polygon デプロイ済みコントラクト |
| **API サーバー** | リクエスト処理、判定結果統合、トランザクション実行 | Node.js/Express |
| **モバイルアプリ** | QRスキャン、ローカル認証、オフライン同期 | React Native (iOS/Android) |
| **オペレーター** | システム監視、トラブル対応、イベント管理 | 沖縄文芸フリマ運営チーム |

---

## 第2部：実装仕様

---

## 4. QRコード仕様

### 4.1 QRペイロード構造
```json
{
  "event_id": "furima_2026_okinawa",
  "action_type": "item_registration|sns_post|recommendation|attendance|support",
  "action_id": "act_20260812_001",
  "timestamp": "2026-08-12T14:30:00Z",
  "nonce": "abc123def456ghi789...",
  "required_ai_checks": [
    "identity_verification",
    "authenticity_check",
    "isolation_score_adjustment",
    "risk_detection"
  ],
  "smart_contract_address": "0x1a2b3c4d5e6f7g8h...",
  "blockchain_network": "polygon_testnet"
}
```

### 4.2 生成タイミング＆配置
- **オンライン**: ユーザーアプリ内にリアルタイム表示
- **オフライン**: 紙プリント（会場配布、バーコード併記）
- **ハイブリッド**: 両方並行実装

### 4.3 有効期限
- **単一使用**: 1QRコード = 1度のスキャンのみ有効
- **有効期間**: 生成から 30日間（イベント期間中＋バッファ）
- **期限切れ対応**: オフチェーン記録で補完可能

---

## 5. APIエンドポイント

### 5.1 POST /api/v1/scan-qr

**リクエスト**:
```json
{
  "qr_payload": "eyJldmVudF9pZCI6ImZ1cmltYV8yMDI2X29raW5hd2EiLCAi...",
  "user_id": "user_1a2b3c",
  "user_signature": "0xdef456789abcdef0123456789abcdef012345678...",
  "device_id": "device_789ghi_iphone13",
  "timestamp": "2026-08-12T14:30:05Z"
}
```

**レスポンス（成功）**:
```json
{
  "status": "success",
  "action_id": "act_20260812_001",
  "tokens_awarded": {
    "participation_token": 10,
    "isolation_adjustment": 1.5,
    "total_multiplied": 15
  },
  "transaction_hash": "0x1234567890abcdef1234567890abcdef...",
  "blockchain_confirmation_time": "3.2 seconds",
  "user_isolation_score_new": 2.8,
  "message": "出品登録成功！15トークンを獲得しました"
}
```

**レスポンス（AI判定で失敗）**:
```json
{
  "status": "rejected",
  "reason": "authenticity_check_failed",
  "detail": "同じ内容の出品が既に登録されています（2026-08-11）。新規性を確認してください。",
  "action_id": "act_20260812_001",
  "suggested_action": "support_ticket_creation"
}
```

### 5.2 その他の主要エンドポイント

| エンドポイント | メソッド | 用途 |
|---|---|---|
| `/api/v1/user/{user_id}/tokens` | GET | ユーザーの現在トークン残高取得 |
| `/api/v1/user/{user_id}/isolation-score` | GET | 孤立スコア確認 |
| `/api/v1/transaction/{tx_hash}` | GET | ブロックチェーン記録確認 |
| `/api/v1/offline-sync` | POST | オフライン時の記録同期 |
| `/api/v1/support-ticket` | POST | 判定失敗時のサポートチケット作成 |

---

## 6. AI判定エンジン統合

### 6.1 4層判定パイプライン

**Layer 1: 本人確認スコア**
```
入力: ウォレット署名、生体認証、デバイスID、過去行動
出力: 0.0～1.0 のスコア（閾値: ≥0.95）
判定内容:
- ウォレット署名の暗号学的検証
- デバイスの登録済みチェック
- 生体認証の成功確認
- 過去の「なりすまし」パターン検出
```

**Layer 2: 行為の真正性スコア**
```
入力: action_type, ユーザー履歴, 外部データ（SNS、推薦元）
出力: 0.0～1.0 のスコア（閾値: ≥0.85）
判定内容（action_type別）:
- item_registration: 新規性検査、スパム出品パターン検出
- sns_post: SNSアカウント実績確認、エンゲージメント分析
- recommendation: 推薦元の信用スコア、不当な推薦パターン検出
- attendance: 会場到着確認（位置情報など）
- support: 相互扶助の真正性確認
```

**Layer 3: 孤立スコア計算**
```
孤立スコア = 基本値 1.0 × 調整倍率（1.0～2.0x）

調整倍率の計算（3要素の加重平均）:
- 社会的関与度（40%）: SNS活動, コミュニティ参加
- コミュニティ貢献度（30%）: 他者へのサポート回数, レビュー数
- 信用蓄積度（30%）: 過去の正当な行為数, トークン保有期間

実装例:
社会的関与度 = 0.8  (SNS投稿活発)
コミュニティ貢献度 = 0.6  (サポート少ない)
信用蓄積度 = 0.9  (古参ユーザー)

倍率 = 0.8×0.4 + 0.6×0.3 + 0.9×0.3 = 0.32 + 0.18 + 0.27 = 0.77
スコア = 1.0 + 0.77 = 1.77x → トークン ×1.77 倍
```

**Layer 4: リスク検出**
```
不正パターン検出:
- 短時間多数スキャン（botっぽい）
- 同一デバイスからの大量アカウント
- 不可能な地理的位置変化
- 非典型的な行動パターン

判定: リスクスコア > 0.7 なら rejected
```

### 6.2 AI判定の出力フォーマット
```json
{
  "authenticity_score": 0.92,
  "identity_confidence": 0.99,
  "isolation_adjustment": 1.5,
  "risk_score": 0.15,
  "recommendation": "approve",
  "reasoning": "User has consistent posting history. High isolation score (2.5) warrants 1.5x multiplier. Low risk score indicates normal activity pattern."
}
```

---

## 7. トークンシステム統合

### 7.1 5トークン種別と基本獲得量

| トークン名 | 英名 | 獲得行為 | 基本獲得量 | 目的 |
|---|---|---|---|---|
| 参加トークン | Participation Token | 出品登録、来場、イベント参加 | 10 | 参加促進 |
| 発信トークン | Broadcasting Token | SNS投稿、レビュー、コンテンツ作成 | 15 | 情報流通促進 |
| 被推薦トークン | Recommendation Token | 他者から推薦される | 20 | 評判形成 |
| 応援トークン | Support Token | 相互扶助（他者をサポート） | 25 | コミュニティ形成 |
| 確認トークン | Verification Token | AI判定に合格、完全透明性達成 | 5 | 信用の可視化 |

### 7.2 孤立スコア乗数テーブル

| スコア範囲 | 倍率 | 社会的地位 | 例 |
|---|---|---|---|
| 0.8～1.0 | 1.0x | 新規参加者 | 初回参加 |
| 1.0～1.3 | 1.1x | 活動初期 | 2-3回目参加 |
| 1.3～1.6 | 1.3x | 定常参加 | 月1回以上参加 |
| 1.6～1.8 | 1.5x | 常連 | 月複数回参加 |
| 1.8～2.0 | 2.0x | コアメンバー | 運営協力者 |

### 7.3 トークンの価値化ステージ

**ステージ1: 地域クレジット化（2026年9月～）**
```
1 トークン = 100円相当
→ 沖縄市内の提携商店で使用可能
→ 地域経済の循環を促進
```

**ステージ2: 教育投資化（2026年10月～）**
```
貯めたトークン → 子どもの塾代、教育サービス購入に充当
「自分の知識・スキル」が「次世代教育」に転換
```

**ステージ3: 信用スコア化（2027年～）**
```
トークン保有量 → ローン金利優遇、仕事紹介優先度
「貧困層でも『信用がある』と認識される」
```

**ステージ4: 福祉投票権化（2030年～）**
```
2050年：トークン多さ → 福祉予算配分を投票できる
「支援を受けた人が、福祉を決める側になる」
```

### 7.4 トークンライフサイクル

```
発行 (スキャン時) 
  ↓
ユーザーウォレット保有
  ↓
流通 (商店決済 or 教育充当)
  ↓
消費 or 貯蓄継続
  ↓
会計報告 (ブロックチェーン記録で透明性確保)
```

---

## 8. スマートコントラクト統合

### 8.1 主要関数（セキュリティ重視設計）

**関数1: トークン発行**
```solidity
function mintTokens(
    address userAddress,
    uint256 amount,
    string memory actionType,
    uint256 timestamp
) public onlyMinter noReentrancy {
    require(userAddress != address(0), "Invalid user address");
    require(amount > 0, "Amount must be positive");
    
    // トークン生成
    userTokens[userAddress] += amount;
    
    // イベント発火（監査ログ）
    emit TokensMinted(userAddress, amount, actionType, timestamp);
}
```

**関数2: 孤立スコア更新**
```solidity
function updateIsolationScoreMultiplier(
    address userAddress,
    uint256 newMultiplier
) public onlyOracle {
    require(userAddress != address(0), "Invalid address");
    require(newMultiplier >= 100 && newMultiplier <= 200, "Multiplier out of range (1.0-2.0x)");
    
    userIsolationScores[userAddress] = newMultiplier;
    
    emit IsolationScoreUpdated(userAddress, newMultiplier);
}
```

**関数3: 二重使用防止**
```solidity
mapping(string => bool) public usedActionIds;

function validateActionId(string memory actionId) internal returns (bool) {
    require(!usedActionIds[actionId], "Action ID already used");
    
    usedActionIds[actionId] = true;
    return true;
}
```

### 8.2 ロールベースアクセス制御

| ロール | 権限 | 例 |
|---|---|---|
| **Owner** | デプロイ時に最初のオーナー、他のロール付与権限 | 法人代表 |
| **Minter** | `mintTokens()` 実行、トークン発行 | API サーバー認証 |
| **Oracle** | `updateIsolationScoreMultiplier()` 実行、スコア更新 | AI判定エンジン認証 |
| **Pauser** | 緊急時にコントラクト一時停止 | セキュリティチーム |

### 8.3 ガス費用最適化戦略

- **2026（Polygon Testnet）**: 1トランザクション ＜ ¥50
- **2027+（Solana Mainnet）**: 1トランザクション ＜ ¥1
- **最適化手法**:
  - バッチ処理（複数トークンを1トランザクションで発行）
  - L2 ガス削減効果の活用
  - Event ベースの監査ログ（ストレージ最適化）

---

## 第3部：運用設計

---

## 9. エンドツーエンドユーザーフロー

### シナリオ：沖縄文芸フリマで出品者がトークンを獲得する流れ

```
【来場前】
1. アプリダウンロード＆ウォレット登録
   - MetaMask or Phantom など
   - 生体認証設定（Face ID/指紋認証）

【来場当日】
2. 受付で QRコード受け取り
   - 「出品登録」用の紙QR
   - 「SNS投稿」用のオンラインQR（アプリに表示）

3. 出品物を登録
   - フリマの対面受付でスタッフが説明
   - 自分でアプリ内で入力も可

4. QRをスキャン
   - アプリでカメラを起動
   - 「出品登録」のQRをスキャン
   - 自動で生体認証トリガー
     → 指紋/顔認証実行

5. APIサーバーが処理
   - ウォレット署名検証（OK）
   - QRペイロード検証（OK）
   - AI判定実行
     → 本人確認スコア 0.98 (OK: >0.95)
     → 真正性スコア 0.88 (OK: >0.85)
     → 孤立スコア 1.5x (常連なので)
     → リスク検出 0.12 (OK: <0.7)
   - 重複チェック（新規出品なのでOK）

6. スマートコントラクト実行
   - 基本トークン 10個
   × 孤立スコア 1.5x = 15個獲得
   → Polygon に記録
   → transaction_hash 発行

7. アプリ確認画面
   画面に表示:
   ```
   ✅ 出品登録成功！
   🎖️  獲得トークン: 15個
      （参加 10 × 常連倍率 1.5x）
   📊 現在のスコア: 2.8
   ⏱️  処理時間: 3.2秒
   ```

【フリマ終了後】
8. トークン確認＆使用開始
   - アプリで「マイトークン残高」確認
   - 9月から提携商店で使用可能
   - 教育プラットフォーム（人生科 Module 6）の
     有料部分を解放可能

9. スコア更新
   - オペレーターが毎週、
     孤立スコアを再計算
   - 運営との関係・その他参加者との
     相互作用を反映
```

---

## 10. セキュリティモデル

### 10.1 ゼロトラスト検証原則

```
基本ルール:
「外部からのインプット」は全て「信頼できない」と仮定
 ↓
複数層の検証を通過した後のみ「内部状態」を変更
 ↓
全ての変更は「改ざん不可能に」記録
```

### 10.2 信頼境界

```
┌────────────────────────────────────────────────────┐
│ 【外部（信頼できない）】                            │
│ - ユーザーからのQRペイロード                        │
│ - ウォレット署名                                    │
│ - デバイスID                                        │
│ - API リクエスト                                    │
└─────────────────────────────────────────────────────┘
        ↑ 厳格な検証ゲートウェイ
        │ （署名検証、ペイロード検証、時刻チェック）
        ↓
┌─────────────────────────────────────────────────────┐
│ 【内部（信頼できる）】                              │
│ - AI判定結果                                        │
│ - トークン発行決定                                  │
│ - ブロックチェーン記録                              │
│ - ユーザーウォレット状態                            │
└─────────────────────────────────────────────────────┘
```

### 10.3 主要なセキュリティ実装

**入力検証**:
- QRペイロード: JSON schema validation + nonce チェック
- ウォレット署名: ECDSA 暗号検証
- タイムスタンプ: UTC ±3分ウィンドウ
- Device ID: 事前登録チェック

**状態管理**:
- Reentrancy 防止: `noReentrancy` modifier
- 二重使用防止: `usedActionIds` mapping
- 権限分離: `onlyMinter`, `onlyOracle`

**監査ログ**:
```solidity
event TokensMinted(address indexed user, uint256 amount, string action, uint256 timestamp);
event IsolationScoreUpdated(address indexed user, uint256 newScore);
event ActionIdValidated(string actionId, address user, uint256 timestamp);
```

### 10.4 なりすまし防止

- ウォレット署名による本人確認（回避困難）
- 生体認証の併用（2段階認証）
- デバイスID の登録・検証

---

## 11. テストシナリオ

### 11.1 正常系テスト

| # | テスト項目 | 期待結果 | 成功条件 |
|---|---|---|---|
| T-01 | QRスキャン → トークン発行完了 | ≤3秒以内に response 返却 | 3秒以内 |
| T-02 | 孤立スコア高いユーザー → 1.5倍トークン発行 | 基本10個 × 1.5倍 = 15個 | 正確に15個 |
| T-03 | オフラインスキャン → 復帰時に同期完了 | ローカル記録 → サーバー同期 → ブロックチェーン記録 | 全3段階完了 |
| T-04 | 複数ユーザーの同時スキャン | 各ユーザーが独立してトークン獲得 | 並行実行でエラーなし |
| T-05 | APIレスポンスフォーマット検証 | JSON 形式、全必須フィールド存在 | スキーマ完全一致 |

### 11.2 異常系テスト

| # | テスト項目 | 期待結果 | 成功条件 |
|---|---|---|---|
| E-01 | 同一QRの二重スキャン | 2回目：rejected，nonce重複エラー | 2回目で拒否 |
| E-02 | 改ざんされたQRペイロード | JSON parse error or nonce check fail | rejected |
| E-03 | 本人確認失敗（署名不正） | status: "rejected", reason: "identity_verification_failed" | トークン発行なし |
| E-04 | AI判定で真正性低い行為 | status: "rejected", reason: "authenticity_check_failed" | トークン発行なし |
| E-05 | 無効なウォレットアドレス | error: "Invalid user address" | トランザクション不実行 |
| E-06 | デバイスID未登録 | error: "Device not registered" | スキャン拒否 |
| E-07 | タイムスタンプ古すぎる | error: "Timestamp out of valid window" | ±3分外は拒否 |

### 11.3 負荷テスト

| # | テスト項目 | 目標値 | 成功条件 |
|---|---|---|---|
| L-01 | 同時100スキャン/分に耐える | ≥100 requests/min | レスポンス時間 ≤5秒 |
| L-02 | ピーク時ガス費用（Polygon） | ≤ ¥50/トランザクション | 想定以内 |
| L-03 | DB接続プール | ≥50 concurrent connections | コネクションプール十分 |
| L-04 | AI判定エンジン応答時間 | ≤1秒/request | 4層判定完了 |
| L-05 | ブロックチェーン確認待機 | ≤3秒（Polygon） | 約12秒/block × 100gwei で可 |

---

## 12. オフライン対応・事後同期メカニズム

### 12.1 インターネット接続不安定な場合

```
【オンライン時】
QRスキャン → API送信 → ブロックチェーン記録 → 即座反映

【オフライン時】
QRスキャン → ローカルに一時記録（SQLite）→ UI確認画面表示
             （確認画面は「**同期保留中**」と表示）

【インターネット復帰時】
自動的に同期開始
 ① ローカル記録の qr_payload を API に送信
 ② API が重複チェック（既に処理済みならスキップ）
 ③ ブロックチェーンに記録
 ④ アプリに「✅ 同期完了」通知
```

### 12.2 手動報告フォーム（QRスキャン不可の場合）

```
QRスキャンできなかった参加者向け:
1. 来場者が「手動報告フォーム」に入力
   - 自分の行為（出品登録、推薦など）
   - ユーザー情報

2. オペレーターがフォーム確認
3. AI判定を手動トリガー
4. トークン発行（同じ流れ）
```

---

## 第4部：学習プラットフォーム統合

---

## 13. Stripe統合設計

### 13.1 SupportSection コンポーネント（reference: money_burden_2026.html）

```jsx
<SupportSection>
  <badge>🎓 人生科 Module 6</badge>
  <title>沖縄文芸フリマ実験プロトタイプ設計</title>
  <description>
    知識・スキル・文化をトークン化し、リアルタイム価値流通させるシステムの実装実験。
    このドキュメントは、2026年8月～12月のパイロット実装の完全仕様書です。
  </description>
  
  <StripeBuyButton 
    buyButtonId="buy_btn_1T4shDCX0SDYX6T6eZVq5b1U" 
    publishableKey="pk_live_bzIbtifxztk8A83vMxbU0rs000Hjw7MonH"
  />
  
  <legalLinks>
    <TOCIHO /> （特定商取引法に基づく表記）
    <PrivacyPolicy />
  </legalLinks>
</SupportSection>
```

### 13.2 有料メンバーシップの構成

```
【基本コース】（¥4,980/month）
✓ このドキュメント全編へのアクセス
✓ 実装コード例の閲覧
✓ テストシナリオ詳細版
✓ AI判定エンジン設計書
✓ スマートコントラクト完全解説

【プロフェッショナルコース】（¥9,980/month）
✓ 基本コース全部
✓ オンライン質問フォーム（週2回まで）
✓ 実装チェックリスト
✓ Polygon Testnet デプロイガイド
✓ トラブルシューティング集

【企業導入コース】（要相談）
✓ プロフェッショナルコース全部
✓ 専任サポート（Slack）
✓ 独自カスタマイズ相談
✓ 実装支援ワークショップ（月1回）
```

---

## 14. React アーキテクチャ（Dual Presentation Mode）

### 14.1 コンポーネント構成

```jsx
├── App
│   ├── Header（navigation）
│   ├── PresentationModeToggle（「ポンチ絵」 vs 「インフォグラフィック」）
│   ├── MainContent
│   │   ├── PonchieView（ビジュアル重視）
│   │   │   ├── SystemArchitectureDiagram
│   │   │   ├── UserFlowAnimation
│   │   │   ├── TokenEconomicsVisualization
│   │   │   └── TimelineGantt
│   │   └── DetailedView（詳細テキスト）
│   │       ├── SpecificationSections
│   │       ├── CodeExamples
│   │       └── TechnicalDetails
│   ├── SupportSection（Stripe統合）
│   └── Footer
```

### 14.2 レスポンシブデザイン

```css
/* Mobile-first approach */
@media (max-width: 768px) {
  .content-layout = single-column
  .diagram-width = 100%
  .code-snippet-font-size = 12px
}

@media (min-width: 768px) {
  .content-layout = two-column
  .left-panel = visual (60%)
  .right-panel = text (40%)
}
```

---

## 15. デプロイメントパイプライン

### 15.1 ファイル配置（www repository）

```
/Users/kanmemacbookair/Desktop/github/www/
├── learning/
│   ├── module-06_furima-experiment-integration-spec.md （本体）
│   ├── code-samples/
│   │   ├── smart-contract.sol
│   │   ├── api-server.js
│   │   └── react-components.jsx
│   ├── diagrams/
│   │   ├── system-architecture.png
│   │   ├── user-flow.svg
│   │   └── token-economy.png
│   ├── test-scenarios.md
│   └── stripe-integration.md
├── index.html （Stripe Buy Button統合）
└── styles/
    └── learning.css
```

### 15.2 CI/CD パイプライン

```
1. git push to main (www repository)
   ↓
2. GitHub Actions trigger
   ├── Markdown lint check
   ├── Code example validation
   └── Link validation
   ↓
3. Deploy to alpaca-school.okinawa
   ├── Build static HTML
   ├── Integrate Stripe
   ├── Optimize images
   └── Deploy to production
   ↓
4. Post-deploy verification
   ├── Stripe button functional test
   ├── Page load performance
   └── SEO check
```

---

## 実装タイムライン

| 時期 | マイルストーン | 完了条件 | 責務 |
|------|---|---|---|
| **5月中旬** | 本仕様書完成 | この統合仕様書が確定 | 企画・設計 |
| **5月下旬～6月** | Polygon Testnet デプロイ | スマートコントラクト動作確認 | エンジニア |
| **6月下旬** | アプリ β版リリース | iOS/Android 実機テスト（30人） | モバイルチーム |
| **7月** | オペレーター訓練 | 運営体制構築、FAQ整備 | 運営チーム |
| **8月1～31日** | **文芸フリマ実験開始** | 100～200スキャン実績確認 | 全チーム |
| **9月** | 結果分析・改善 | ガス費用、レスポンス時間、エラー率を検証 | 分析チーム |
| **10月～12月** | Stripe 本格運用 | 有料メンバーシップ販売開始 | セールス・マーケ |
| **2027年春** | Solana Mainnet 移行 | 本格運用開始（ガス費用 <¥1/tx） | インフラ |

---

## 参考資料・依存仕様

- **別仕様書**: AI真正性判定システム仕様 (`ai-authenticity-judgment-spec.md`)
- **別仕様書**: トークンシステム仕様 (`token-system-spec.md`)
- **別仕様書**: スマートコントラクト設計 (`smart-contract-design-spec.md`)
- **別仕様書**: QRコード→ブロックチェーン実行フロー (`qr-to-blockchain-spec.md`)
- **人生科モジュール**: Module 2（AI貧困予測）, Module 4（AI家庭教師）, Module 5（ブロックチェーン経済）
- **Reference Implementation**: money_burden_2026.html（Stripe統合パターン）

---

**設計責任者**: 佐渡山 要 (人生科プロジェクト統括)  
**技術レビュー**: （署名欄）  
**運用責任者**: （署名欄）

