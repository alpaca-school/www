# システムアーキテクチャ図

## QR-to-Token システム全体構成

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          ユーザー層（フロントエンド）                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │              React 双層UIコンポーネント                            │   │
│  │  ┌─────────────────┐              ┌──────────────────┐           │   │
│  │  │ ポンチ絵モード    │              │  詳細モード       │           │   │
│  │  │ (意思決定者向け) │              │ (学習者向け)     │           │   │
│  │  │                 │              │                  │           │   │
│  │  │ • 統計カード    │              │ • ダッシュボード  │           │   │
│  │  │ • QRスキャン    │              │ • チャート表示   │           │   │
│  │  │ • 簡易説明      │              │ • スコア詳細    │           │   │
│  │  └─────────────────┘              └──────────────────┘           │   │
│  │           ↓                               ↓                       │   │
│  │  ┌──────────────────────────────────────────────────────────┐   │   │
│  │  │        ユーザー状態管理（userId, authToken）              │   │   │
│  │  │        scanResult, userStats, loading状態              │   │   │
│  │  └──────────────────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                              │                                          │
└──────────────────────────────┼──────────────────────────────────────────┘
                               │ HTTPS
                    ┌──────────▼─────────────┐
                    │  AuthToken検証         │
                    │  (Bearer Header)       │
                    └──────────┬─────────────┘
                               │
┌──────────────────────────────┼──────────────────────────────────────────┐
│                          API層（バックエンド）                           │
├──────────────────────────────┼──────────────────────────────────────────┤
│                              │                                          │
│              ┌───────────────▼────────────────┐                         │
│              │   Express.js REST API Server   │                         │
│              │   (Node.js)                     │                         │
│              ├────────────────────────────────┤                         │
│              │ POST /api/v1/scan-qr           │                         │
│              │ GET  /api/v1/user/{id}/tokens  │                         │
│              │ GET  /api/v1/user/{id}/iso...  │                         │
│              └───────────────┬────────────────┘                         │
│                              │                                          │
│              ┌───────────────▼────────────────┐                         │
│              │   QR Payload Processing        │                         │
│              │                                │                         │
│              │ 1. Base64 Decode              │                         │
│              │ 2. JSON Parse                 │                         │
│              │ 3. Schema Validation          │                         │
│              └───────────────┬────────────────┘                         │
│                              │                                          │
│              ┌───────────────▼────────────────┐                         │
│              │  Signature Verification        │                         │
│              │  (ECDSA via ethers.js)        │                         │
│              │                                │                         │
│              │ • messageHash計算              │                         │
│              │ • recoverAddress検証           │                         │
│              │ • signer == user_id確認        │                         │
│              └───────────────┬────────────────┘                         │
│                              │                                          │
│              ┌───────────────▼────────────────┐                         │
│              │  AI Judgment Engine (4層)      │                         │
│              │                                │                         │
│              │ Layer 1: Identity              │                         │
│              │   (device + signature) >= 0.95│                         │
│              │                                │                         │
│              │ Layer 2: Authenticity          │                         │
│              │   (payload + timestamp) >= 0.85                         │
│              │                                │                         │
│              │ Layer 3: Isolation Score       │                         │
│              │   (1.0～2.0x multiplier)      │                         │
│              │                                │                         │
│              │ Layer 4: Risk Detection        │                         │
│              │   (fraud pattern analysis)     │                         │
│              └───────────────┬────────────────┘                         │
│                              │                                          │
│              ┌───────────────▼────────────────┐                         │
│              │  Nonce Validation              │                         │
│              │  (Replay Attack Prevention)    │                         │
│              │                                │                         │
│              │ • usedNonces Set管理           │                         │
│              │ • {user_id}:{nonce}検証        │                         │
│              └───────────────┬────────────────┘                         │
│                              │                                          │
└──────────────────────────────┼──────────────────────────────────────────┘
                               │ Web3.js
              ┌────────────────▼────────────┐
              │   Smart Contract Layer       │
              │   (Solidity ERC20)           │
              └────────────────┬────────────┘
                               │
┌──────────────────────────────┼──────────────────────────────────────────┐
│                      ブロックチェーン層                                   │
├──────────────────────────────┼──────────────────────────────────────────┤
│                              │                                          │
│              ┌───────────────▼────────────────┐                         │
│              │  OkinawaToken Contract         │                         │
│              │  (0x1a2b3c4d...)              │                         │
│              │                                │                         │
│              ├────────────────────────────────┤                         │
│              │ State Mappings:                │                         │
│              │  • baseTokenRewards            │                         │
│              │  • isolationScoreMultiplier    │                         │
│              │  • usedActionIds               │                         │
│              │  • userNonces                  │                         │
│              │                                │                         │
│              │ Methods:                       │                         │
│              │  • mintTokens()                │                         │
│              │  • updateIsolationScore()      │                         │
│              │  • setBaseTokenReward()        │                         │
│              │                                │                         │
│              │ Events:                        │                         │
│              │  • TokensMinted                │                         │
│              │  • IsolationScoreUpdated       │                         │
│              │  • ActionIdUsed                │                         │
│              └───────────────┬────────────────┘                         │
│                              │                                          │
│              ┌───────────────▼────────────────┐                         │
│              │  Polygon Testnet (Mumbai)      │                         │
│              │  RPC: maticvigil.com          │                         │
│              │  Chain ID: 80001               │                         │
│              └────────────────────────────────┘                         │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│                        データフロー概要                                    │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  QRコード生成                                                            │
│  (フロントエンド側またはバックエンド側)                                    │
│  ↓                                                                      │
│  base64(JSON.stringify({                                               │
│    event_id: "furima_2026_okinawa",                                    │
│    action_type: "item_registration",                                   │
│    action_id: "act_1234567890",                                        │
│    base_tokens: 20,                                                    │
│    nonce: <random>,                                                    │
│    timestamp: <ISO8601>                                                │
│  }))                                                                   │
│  ↓                                                                      │
│  ユーザーがQRをスキャン → frontend captures payload                     │
│  ↓                                                                      │
│  署名生成（秘密鍵でECDSA署名）→ POST /api/v1/scan-qr                   │
│  ↓                                                                      │
│  APIサーバー側：                                                        │
│    1. Base64デコード & JSON解析                                         │
│    2. ECDSA署名検証（recoverAddress）                                   │
│    3. Nonce二重使用チェック                                             │
│    4. AI判定エンジン4層実行                                             │
│    5. トークン計算: base_tokens × isolationScore                        │
│  ↓                                                                      │
│  mintTokens(user, action_type, action_id, nonce, signature)            │
│  → スマートコントラクト実行                                             │
│  ↓                                                                      │
│  トークン発行 → user.balance += tokensAwarded                           │
│  ↓                                                                      │
│  API応答: {                                                            │
│    status: "success",                                                  │
│    tokens_awarded: { ... },                                            │
│    transaction_hash: "0x...",                                          │
│    blockchain_confirmation_time: "3.2 seconds",                        │
│    ai_scores: { identity, authenticity, ... }                         │
│  }                                                                     │
│  ↓                                                                      │
│  フロントエンド更新：userStats.balance += tokensAwarded                │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

## セキュリティレイヤー

```
┌─────────────────────────────────────────────────────────────┐
│                   多層セキュリティ設計                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Layer 1: Transport Security                               │
│  ├─ HTTPS (TLS 1.3)                                        │
│  └─ Bearer Token Authentication                            │
│                                                             │
│  Layer 2: Payload Integrity                                │
│  ├─ Base64 Encoding/Decoding                               │
│  ├─ JSON Schema Validation                                 │
│  └─ Timestamp Validation (±3分)                            │
│                                                             │
│  Layer 3: Cryptographic Verification                       │
│  ├─ ECDSA Signature (secp256k1)                            │
│  ├─ Keccak256 Message Hashing                              │
│  └─ Address Recovery & Verification                        │
│                                                             │
│  Layer 4: State Protection                                 │
│  ├─ Nonce Tracking (ReplayProtection)                      │
│  ├─ Action ID Deduplication (usedActionIds)                │
│  └─ Contract Role-Based Access Control                     │
│                                                             │
│  Layer 5: Behavioral Detection                             │
│  ├─ AI Judgment Engine (4層)                               │
│  ├─ Identity Verification Score                            │
│  └─ Authenticity & Risk Scoring                            │
│                                                             │
│  Layer 6: Smart Contract Safeguards                        │
│  ├─ ReentrancyGuard                                        │
│  ├─ AccessControl Roles                                    │
│  └─ Integer Overflow Protection                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
