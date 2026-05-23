// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * @title OkinawaToken
 * @notice Okinawa文芸フリマ用トークンシステム
 * @dev Polygon Testnet デプロイ対象
 */
contract OkinawaToken is ERC20, AccessControl, ReentrancyGuard {
    using ECDSA for bytes32;

    // ロール定義
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    // トークン報酬テーブル（action_type別）
    mapping(string => uint256) public baseTokenRewards;

    // 孤立スコア乗数（user_idごと）
    mapping(address => uint256) public isolationScoreMultiplier;

    // 使用済みアクション防止（action_id → used）
    mapping(bytes32 => bool) public usedActionIds;

    // nonce履歴（二重署名防止）
    mapping(address => uint256) public userNonces;

    // イベント
    event TokensMinted(
        address indexed user,
        string actionType,
        uint256 baseAmount,
        uint256 multipliedAmount,
        string actionId
    );

    event IsolationScoreUpdated(address indexed user, uint256 newMultiplier);
    event ActionIdUsed(bytes32 indexed actionHash);

    /**
     * @dev コンストラクタ
     */
    constructor() ERC20("Okinawa Token", "OKNT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);

        // デフォルト報酬設定
        baseTokenRewards["item_registration"] = 20;
        baseTokenRewards["sns_post"] = 15;
        baseTokenRewards["recommendation"] = 10;
        baseTokenRewards["attendance"] = 5;
        baseTokenRewards["support"] = 8;

        // デフォルト孤立スコア乗数（1.0x = 100）
        isolationScoreMultiplier[msg.sender] = 100;
    }

    /**
     * @notice トークンをミント（NFT風に報酬を発行）
     * @param _user ユーザーアドレス
     * @param _actionType アクション種類（item_registration等）
     * @param _actionId ユニークなアクションID
     * @param _nonce ユーザーのnonce（署名検証用）
     * @param _signature ユーザーのECDSA署名
     * @return mintedAmount 実際にミントされたトークン数
     */
    function mintTokens(
        address _user,
        string calldata _actionType,
        string calldata _actionId,
        uint256 _nonce,
        bytes calldata _signature
    ) external onlyRole(MINTER_ROLE) nonReentrant returns (uint256) {
        // 1. ユーザーnonce検証
        require(_nonce == userNonces[_user], "Invalid nonce");

        // 2. ECDSA署名検証
        bytes32 messageHash = keccak256(
            abi.encodePacked(_user, _actionType, _actionId, _nonce)
        );
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
        address signer = ethSignedMessageHash.recover(_signature);
        require(signer == _user, "Invalid signature");

        // 3. 既使用チェック（二重使用防止）
        bytes32 actionHash = keccak256(abi.encodePacked(_actionId));
        require(!usedActionIds[actionHash], "Action ID already used");

        // 4. 報酬計算
        uint256 baseReward = baseTokenRewards[bytes(_actionType).length > 0
            ? baseTokenRewards[_actionType]
            : 5];

        uint256 multiplier = isolationScoreMultiplier[_user] > 0
            ? isolationScoreMultiplier[_user]
            : 100;

        uint256 finalAmount = (baseReward * multiplier) / 100;

        // 5. ミント実行
        _mint(_user, finalAmount);

        // 6. 状態更新
        usedActionIds[actionHash] = true;
        userNonces[_user]++;

        // 7. イベント発行
        emit TokensMinted(_user, _actionType, baseReward, finalAmount, _actionId);

        return finalAmount;
    }

    /**
     * @notice 孤立スコア乗数を更新（AI判定結果反映）
     * @param _user ユーザーアドレス
     * @param _newMultiplier 新しい乗数（100 = 1.0x）
     * @dev 外部AI判定エンジンから呼び出される想定
     */
    function updateIsolationScoreMultiplier(
        address _user,
        uint256 _newMultiplier
    ) external onlyRole(ADMIN_ROLE) {
        require(_newMultiplier >= 100 && _newMultiplier <= 200, "Multiplier out of range");
        isolationScoreMultiplier[_user] = _newMultiplier;
        emit IsolationScoreUpdated(_user, _newMultiplier);
    }

    /**
     * @notice 報酬テーブルを更新
     * @param _actionType アクション種類
     * @param _reward 新しい報酬額
     */
    function setBaseTokenReward(
        string calldata _actionType,
        uint256 _reward
    ) external onlyRole(ADMIN_ROLE) {
        baseTokenRewards[_actionType] = _reward;
    }

    /**
     * @notice ユーザーの現在の孤立スコア乗数を取得
     * @param _user ユーザーアドレス
     * @return 乗数（100 = 1.0x）
     */
    function getIsolationScoreMultiplier(address _user)
        external
        view
        returns (uint256)
    {
        return isolationScoreMultiplier[_user] > 0
            ? isolationScoreMultiplier[_user]
            : 100;
    }

    /**
     * @notice アクションIDが既に使用済みか確認
     * @param _actionId アクションID
     * @return true=使用済み、false=未使用
     */
    function isActionUsed(string calldata _actionId)
        external
        view
        returns (bool)
    {
        return usedActionIds[keccak256(abi.encodePacked(_actionId))];
    }

    /**
     * @notice 供給量の小数点以下の桁数（18で固定）
     */
    function decimals() public pure override returns (uint8) {
        return 18;
    }
}
