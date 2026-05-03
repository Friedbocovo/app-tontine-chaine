// ================================
// CONTRACT.JS
// ABI + Adresse du contrat TontineChain
// Déployé sur Polygon Mumbai (testnet)
// ================================

// Adresse du contrat déployé
// À remplacer par la vraie adresse après déploiement
export const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";

// ABI complet du contrat TontineChain
export const CONTRACT_ABI = [

  // ================================
  // EVENTS
  // ================================
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "id", "type": "uint256" },
      { "indexed": false, "name": "name", "type": "string" },
      { "indexed": true, "name": "organizer", "type": "address" }
    ],
    "name": "TontineCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "tontineId", "type": "uint256" },
      { "indexed": true, "name": "member", "type": "address" }
    ],
    "name": "MemberJoined",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "tontineId", "type": "uint256" },
      { "indexed": false, "name": "round", "type": "uint256" },
      { "indexed": true, "name": "member", "type": "address" },
      { "indexed": false, "name": "amount", "type": "uint256" }
    ],
    "name": "ContributionPaid",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "tontineId", "type": "uint256" },
      { "indexed": false, "name": "round", "type": "uint256" },
      { "indexed": true, "name": "beneficiary", "type": "address" },
      { "indexed": false, "name": "amount", "type": "uint256" }
    ],
    "name": "PotReleased",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "tontineId", "type": "uint256" }
    ],
    "name": "TontineCompleted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "tontineId", "type": "uint256" },
      { "indexed": true, "name": "member", "type": "address" },
      { "indexed": false, "name": "amount", "type": "uint256" },
      { "indexed": false, "name": "recipient", "type": "string" },
      { "indexed": false, "name": "percentage", "type": "uint256" }
    ],
    "name": "PenaltyApplied",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "tontineId", "type": "uint256" },
      { "indexed": true, "name": "member", "type": "address" },
      { "indexed": false, "name": "message", "type": "string" }
    ],
    "name": "WarningIssued",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "tontineId", "type": "uint256" },
      { "indexed": true, "name": "member", "type": "address" }
    ],
    "name": "MemberExcluded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "tontineId", "type": "uint256" },
      { "indexed": true, "name": "member", "type": "address" },
      { "indexed": false, "name": "amountDue", "type": "uint256" },
      { "indexed": false, "name": "timestamp", "type": "uint256" },
      { "indexed": false, "name": "contact", "type": "string" }
    ],
    "name": "AuthorityReported",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "wallet", "type": "address" }
    ],
    "name": "KYCValidated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "wallet", "type": "address" }
    ],
    "name": "KYCRejected",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "wallet", "type": "address" },
      { "indexed": false, "name": "amount", "type": "uint256" }
    ],
    "name": "DebtRepaid",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "wallet", "type": "address" }
    ],
    "name": "BlacklistLifted",
    "type": "event"
  },

  // ================================
  // FONCTIONS LECTURE (view)
  // ================================
  {
    "inputs": [{ "name": "_tontineId", "type": "uint256" }],
    "name": "getTontineDetails",
    "outputs": [
      { "name": "name", "type": "string" },
      { "name": "organizer", "type": "address" },
      { "name": "contributionAmount", "type": "uint256" },
      { "name": "frequency", "type": "uint256" },
      { "name": "maxMembers", "type": "uint256" },
      { "name": "currentMembers", "type": "uint256" },
      { "name": "currentRound", "type": "uint256" },
      { "name": "totalCollected", "type": "uint256" },
      { "name": "commonFundAmount", "type": "uint256" },
      { "name": "isActive", "type": "bool" },
      { "name": "isRandomOrder", "type": "bool" },
      { "name": "invitationCode", "type": "string" },
      { "name": "orgParticipates", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "name": "_tontineId", "type": "uint256" }],
    "name": "getPaymentStatus",
    "outputs": [
      { "name": "wallets", "type": "address[]" },
      { "name": "names", "type": "string[]" },
      { "name": "paid", "type": "bool[]" },
      { "name": "daysLate", "type": "uint256[]" },
      { "name": "totalPaid", "type": "uint256" },
      { "name": "totalMembers", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "name": "_tontineId", "type": "uint256" },
      { "name": "_wallet", "type": "address" }
    ],
    "name": "getMemberInfo",
    "outputs": [
      { "name": "name", "type": "string" },
      { "name": "phone", "type": "string" },
      { "name": "isActive", "type": "bool" },
      { "name": "penaltyCount", "type": "uint256" },
      { "name": "totalPaid", "type": "uint256" },
      { "name": "hasReceived", "type": "bool" },
      { "name": "reliabilityScore", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "name": "_tontineId", "type": "uint256" }],
    "name": "getCurrentBeneficiary",
    "outputs": [
      { "name": "wallet", "type": "address" },
      { "name": "name", "type": "string" },
      { "name": "roundNumber", "type": "uint256" },
      { "name": "expectedAmount", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "name": "_wallet", "type": "address" }],
    "name": "getUserTontines",
    "outputs": [{ "name": "", "type": "uint256[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "name": "_invitationCode", "type": "string" }],
    "name": "getTontinePreview",
    "outputs": [
      { "name": "name", "type": "string" },
      { "name": "organizer", "type": "address" },
      { "name": "contributionAmount", "type": "uint256" },
      { "name": "frequency", "type": "uint256" },
      { "name": "currentMembers", "type": "uint256" },
      { "name": "maxMembers", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "name": "_wallet", "type": "address" }],
    "name": "getBlacklistInfo",
    "outputs": [
      { "name": "isBlacklisted", "type": "bool" },
      { "name": "totalDebt", "type": "uint256" },
      { "name": "creditorsCount", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "name": "_wallet", "type": "address" }],
    "name": "getRemainingDebt",
    "outputs": [
      { "name": "remainingDebt", "type": "uint256" },
      { "name": "creditorCount", "type": "uint256" },
      { "name": "sharePerCreditor", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "name": "_wallet", "type": "address" }],
    "name": "kycProfiles",
    "outputs": [
      { "name": "documentHash", "type": "bytes32" },
      { "name": "documentType", "type": "uint8" },
      { "name": "status", "type": "uint8" },
      { "name": "submittedAt", "type": "uint256" },
      { "name": "validatedAt", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tontineCount",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "OFFICIAL_CONTACT",
    "outputs": [{ "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },

  // ================================
  // FONCTIONS ÉCRITURE
  // ================================
  {
    "inputs": [
      { "name": "_name", "type": "string" },
      { "name": "_contributionAmount", "type": "uint256" },
      { "name": "_frequency", "type": "uint256" },
      { "name": "_maxMembers", "type": "uint256" },
      { "name": "_startDate", "type": "uint256" },
      { "name": "_isRandomOrder", "type": "bool" },
      { "name": "_organizerParticipates", "type": "bool" }
    ],
    "name": "createTontine",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "name": "_invitationCode", "type": "string" },
      { "name": "_name", "type": "string" },
      { "name": "_phone", "type": "string" }
    ],
    "name": "joinTontineByCode",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "name": "_tontineId", "type": "uint256" }],
    "name": "payContribution",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "name": "_tontineId", "type": "uint256" }],
    "name": "checkLatePayments",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "name": "_tontineId", "type": "uint256" },
      { "name": "_order", "type": "address[]" }
    ],
    "name": "setBeneficiaryOrder",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "name": "_documentHash", "type": "bytes32" },
      { "name": "_documentType", "type": "uint8" }
    ],
    "name": "submitKYC",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "repayDebt",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
];

// ================================
// CONSTANTES UTILES
// ================================

// Réseau Polygon Mumbai (testnet)
export const NETWORK = {
  chainId: "0x13881",
  chainName: "Polygon Mumbai",
  rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  blockExplorerUrls: ["https://mumbai.polygonscan.com"],
};

// Polygon Mainnet (production)
export const NETWORK_MAINNET = {
  chainId: "0x89",
  chainName: "Polygon Mainnet",
  rpcUrls: ["https://polygon-rpc.com"],
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  blockExplorerUrls: ["https://polygonscan.com"],
};

// Types de documents KYC
export const KYC_DOCUMENT_TYPES = {
  CNI: 0,
  CIP: 1,
  CNI_BIOMETRIQUE: 2,
  PASSEPORT: 3,
};

// Fréquences
export const FREQUENCIES = {
  HEBDOMADAIRE: 7,
  MENSUEL: 30,
};

// Statuts KYC
export const KYC_STATUS = {
  NONE: 0,
  PENDING: 1,
  APPROVED: 2,
  REJECTED: 3,
};