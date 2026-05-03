# 🔗 TontineChain

> **Votre tontine, protégée et transparente**  
> Projet développé pour le **MIABE HACKATHON 2026** — Catégorie D02 : Inclusion financière & DeFi


---

## 📋 Table des matières

1. [À propos du projet](#-à-propos-du-projet)
2. [Contexte et problème](#-contexte-et-problème)
3. [Solution](#-solution)
4. [Architecture technique](#-architecture-technique)
5. [Fonctionnalités](#-fonctionnalités)
6. [Smart Contract](#-smart-contract)
7. [Installation](#-installation)
8. [Structure du projet](#-structure-du-projet)
9. [Variables d'environnement](#-variables-denvironnement)
10. [Déploiement du contrat](#-déploiement-du-contrat)
11. [Équipe](#-équipe)
12. [Roadmap](#-roadmap)

---

## 🎯 À propos du projet

**TontineChain** est une application décentralisée (DApp) qui digitalise et sécurise les tontines béninoises grâce à la technologie blockchain. Elle transforme un système d'épargne informel centenaire en un protocole transparent, automatique et incorruptible.

### ODD ciblés
| ODD | Description |
|-----|-------------|
| 🎯 ODD 1 | Fin de la pauvreté |
| 💼 ODD 8 | Travail décent et croissance économique |
| ⚖️ ODD 10 | Inégalités réduites |
| 🏛️ ODD 16 | Institutions efficaces et responsables |

---

## 🔍 Contexte et problème

### Les tontines au Bénin en chiffres
```
👥  60-70%    des adultes béninois participent à au moins une tontine
💰  400-600M  USD brassés annuellement par les tontines béninoises
⚠️  15-20%    des tontines connaissent chaque année un incident majeur
👩  70%       des participants sont des femmes (premières victimes)
```

### Le problème central
Les tontines béninoises fonctionnent sur la confiance humaine, mais cette confiance seule ne suffit pas :

- ❌ Un organisateur peut **disparaître avec la caisse**
- ❌ Un membre peut **refuser de payer** sans recours
- ❌ L'**ordre de tirage** peut être contesté
- ❌ Les règles ne sont **nulle part contraignantes**
- ❌ Aucune **preuve légale** en cas de litige

---

## 💡 Solution

TontineChain encode les règles de chaque tontine dans un **smart contract Solidity** déployé sur la blockchain Polygon. Une fois créées, ces règles sont **immuables** et **automatiquement appliquées** — personne, pas même l'organisateur, ne peut les modifier.

### Principe fondamental
```
"Code is Law"
Le smart contract EST la loi.
Personne ne peut interférer.
Tout est automatique et immuable.
```

---

## 🏗️ Architecture technique

| Composante | Technologie | Rôle |
|------------|-------------|------|
| **Smart Contract** | Solidity (Polygon PoS) | Encode et exécute toutes les règles |
| **Blockchain** | Polygon PoS | Registre immuable — frais < 0,01 USD/tx |
| **Frontend** | React + TailwindCSS | Interface web responsive (mobile-first) |
| **Wallet** | MetaMask + ERC-4337 | Connexion par téléphone — pas de seed phrase |
| **Stablecoin** | USDC / cUSD | Valeur stable équivalente FCFA |
| **Paiement** | MTN MoMo / Moov Money | Conversion FCFA ↔ stablecoin automatique |
| **KYC** | Oracle DTC | Vérification automatique via API |
| **Oracle** | Chainlink (optionnel) | Conversion FCFA → stablecoin en temps réel |

### Schéma d'architecture

```
┌─────────────────────────────────────────────────┐
│                  FRONTEND (React)                │
│   Mobile-first + Responsive Desktop             │
└──────────────┬──────────────────────────────────┘
               │ Ethers.js
┌──────────────▼──────────────────────────────────┐
│              SMART CONTRACT (Solidity)           │
│              Polygon PoS Blockchain              │
│                                                  │
│  ┌─────────────┐  ┌──────────────┐              │
│  │   Tontines  │  │    KYC       │              │
│  │   Rules     │  │  Blacklist   │              │
│  └─────────────┘  └──────────────┘              │
│  ┌─────────────┐  ┌──────────────┐              │
│  │  Paiements  │  │  Pénalités   │              │
│  │  Automatiq. │  │  Automatiq.  │              │
│  └─────────────┘  └──────────────┘              │
└─────────────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────┐
│         MTN MoMo / Moov Money                   │
│         Conversion FCFA ↔ MATIC                 │
└─────────────────────────────────────────────────┘
```

---

## ✨ Fonctionnalités

### 👤 Authentification & KYC
- [x] Inscription avec numéro de téléphone béninois (+229)
- [x] Vérification SMS
- [x] Code PIN à 6 chiffres + biométrie
- [x] KYC automatique (CNI / CIP / Passeport / Biométrique)
- [x] Selfie avec détection de visage via caméra
- [x] Hash du document stocké on-chain (jamais le document)
- [x] Validation automatique via oracle DTC

### 🏗️ Création de tontine (Organisateur)
- [x] Nom, montant, fréquence (hebdo/mensuel), date de début
- [x] Nombre max de membres
- [x] Participation optionnelle de l'organisateur
- [x] Ordre des bénéficiaires : tirage au sort ou manuel (drag & drop)
- [x] Code d'invitation unique généré automatiquement
- [x] QR Code + partage SMS
- [x] Confirmation de déploiement sur blockchain

### 💰 Gestion des paiements
- [x] Paiement via MTN MoMo / Moov Money
- [x] Suivi en temps réel (qui a payé / en attente)
- [x] Libération automatique de la cagnotte
- [x] Reçu numérique avec référence blockchain
- [x] Historique complet avec hash de transaction

### ⚖️ Système de pénalités (100% automatique)

**CAS 1 — Membre qui a DÉJÀ reçu sa cagnotte :**
```
Jour 1 → Pénalité 10% automatique → Caisse commune
Jour 2 → Avertissement automatique
Jour 3 → Double pénalité 20% → Caisse commune
Jour 4 → Signalement automatique aux autorités
         → Preuve immuable blockchain
         → Contact officiel DTC notifié
```

**CAS 2 — Membre qui N'A PAS encore reçu :**
```
Jour 1 → Pénalité 10% automatique → Caisse commune
Jour 2 → Avertissement automatique
Jour 3 → Exclusion définitive automatique
         → Dette enregistrée blockchain
         → Remboursement à la fin de la tontine
```

### 🔒 Système anti-fraude
- [x] Blacklist globale pour les membres défaillants
- [x] Signalement automatique aux autorités (Jour 7 max)
- [x] Remboursement partiel ou total de la dette
- [x] Score de fiabilité calculé automatiquement
- [x] Caisse commune distribuée à la fin
- [x] Pénalités → Organisateur (s'il ne participe pas) ou caisse commune

### 📊 Dashboard
- [x] Dashboard Organisateur avec stats en temps réel
- [x] Dashboard Membre avec progression du cycle
- [x] Historique complet des transactions
- [x] Notifications en temps réel
- [x] Score de fiabilité (0-100%)
- [x] Profil avec comptes Mobile Money

---

## 📜 Smart Contract

### Fichier : `TontineChain.sol`

#### Fonctions principales

| Fonction | Description | Accès |
|----------|-------------|-------|
| `createTontine()` | Créer une tontine avec règles | Public |
| `joinTontineByCode()` | Rejoindre via code/QR/SMS | Public |
| `payContribution()` | Payer sa cotisation | Membre |
| `checkLatePayments()` | Vérifier les retards (auto) | Public |
| `setBeneficiaryOrder()` | Définir l'ordre des bénéficiaires | Organisateur |
| `submitKYC()` | Soumettre ses documents KYC | Public |
| `repayDebt()` | Rembourser sa dette (partiel/total) | Blacklisté |

#### Fonctions de lecture (React)

| Fonction | Retourne |
|----------|----------|
| `getTontineDetails()` | Toutes les infos d'une tontine |
| `getPaymentStatus()` | Qui a payé ce tour |
| `getMemberInfo()` | Infos + score d'un membre |
| `getCurrentBeneficiary()` | Bénéficiaire du tour actuel |
| `getRoundHistory()` | Historique de tous les tours |
| `getUserTontines()` | Tontines d'un utilisateur |
| `getBlacklistInfo()` | Statut blacklist d'un wallet |

#### Constantes du contrat

```solidity
OFFICIAL_CONTACT    = "+22997000000"  // Numéro DTC — immuable
PENALTY_PERCENT_1   = 10              // Pénalité Jour 1
PENALTY_PERCENT_2   = 20              // Pénalité Jour 3
MAX_DELAY_DAYS      = 3               // Délai max avant exclusion (CAS 2)
DAYS_BEFORE_BLACKLIST = 7             // Jours avant blacklist globale
```

---

## 🚀 Installation

### Prérequis
- Node.js >= 18.0.0
- npm >= 9.0.0
- MetaMask (extension navigateur)
- Compte Polygon Mumbai (testnet)

### 1. Cloner le projet

```bash
git clone https://github.com/votre-equipe/tontinechain.git
cd tontinechain
```

### 2. Installer les dépendances frontend

```bash
npm install
npm install ethers@6.0.0
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Installer les dépendances pour le contrat

```bash
npm install -D hardhat
npm install -D @nomicfoundation/hardhat-toolbox
npx hardhat init
```

### 4. Configurer les variables d'environnement

```bash
cp .env.example .env
# Remplir les valeurs dans .env
```

### 5. Lancer l'application

```bash
npm start
```

L'application sera disponible sur `http://localhost:3000`

---

## 📁 Structure du projet

```
tontinechain/
├── public/
│   └── index.html
├── src/
│   ├── assets/              # Images, logos, icônes
│   ├── blockchain/
│   │   ├── contract.js      # ABI + adresse du contrat
│   │   ├── provider.js      # Connexion wallet + utilitaires
│   │   └── hooks/
│   │       ├── useTontine.js    # Hook tontines
│   │       ├── useMember.js     # Hook membres + KYC
│   │       └── usePayment.js    # Hook paiements
│   ├── components/
│   │   ├── ui/              # Composants réutilisables
│   │   ├── layout/          # Navbar, BottomNav
│   │   └── tontine/         # Composants métier
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── BlockchainContext.jsx
│   ├── pages/
│   │   ├── SplashScreen.jsx
│   │   ├── Onboarding.jsx
│   │   ├── AppLayout.jsx        # Layout universel mobile/desktop
│   │   ├── auth/
│   │   │   ├── ChoixRole.jsx
│   │   │   ├── Inscription.jsx
│   │   │   ├── Verification.jsx
│   │   │   ├── CodePin.jsx
│   │   │   ├── KYC.jsx
│   │   │   └── Connexion.jsx
│   │   ├── organisateur/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── GestionTontine.jsx
│   │   │   ├── Incidents.jsx
│   │   │   ├── Historique.jsx
│   │   │   └── creation/
│   │   │       ├── Etape1Regles.jsx
│   │   │       ├── Etape2Membres.jsx
│   │   │       ├── Etape3Ordre.jsx
│   │   │       └── Confirmation.jsx
│   │   ├── membre/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Rejoindre.jsx
│   │   │   ├── Paiement.jsx
│   │   │   ├── ConfirmationPaiement.jsx
│   │   │   ├── SuiviTour.jsx
│   │   │   └── Historique.jsx
│   │   └── shared/
│   │       ├── Profil.jsx
│   │       └── Notifications.jsx
│   ├── utils/
│   │   ├── formatCFA.js
│   │   ├── formatDate.js
│   │   └── reliabilityScore.js
│   └── App.jsx
├── contracts/
│   └── TontineChain.sol     # Smart contract principal
├── scripts/
│   └── deploy.js            # Script de déploiement
├── test/
│   └── TontineChain.test.js
├── hardhat.config.js
├── tailwind.config.js
├── .env.example
└── README.md
```

---

## 🔐 Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
# Réseau blockchain
REACT_APP_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
REACT_APP_NETWORK=mumbai

# Hardhat / Déploiement
PRIVATE_KEY=votre_cle_privee_ici
POLYGONSCAN_API_KEY=votre_api_key_polygonscan
MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com

# Oracle DTC (KYC)
REACT_APP_DTC_ORACLE_ADDRESS=0x0000000000000000000000000000000000000000

# Optionnel
REACT_APP_INFURA_KEY=votre_infura_key
```

⚠️ **Ne jamais committer le fichier `.env` avec votre clé privée !**

---

## 🛠️ Déploiement du contrat

### Configuration Hardhat

```javascript
// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    mumbai: {
      url: process.env.MUMBAI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    polygon: {
      url: "https://polygon-rpc.com",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
```

### Script de déploiement

```bash
# Compiler le contrat
npx hardhat compile

# Déployer sur Mumbai (testnet)
npx hardhat run scripts/deploy.js --network mumbai

# Vérifier sur PolygonScan
npx hardhat verify --network mumbai ADRESSE_DU_CONTRAT
```

### Obtenir des MATIC de test

```
Faucet Mumbai : https://faucet.polygon.technology/
```

### Après le déploiement

Mettez à jour l'adresse du contrat dans `src/blockchain/contract.js` :

```javascript
export const CONTRACT_ADDRESS = "0xVOTRE_ADRESSE_ICI";
```

---

## 🗺️ Roadmap

### Phase 1 — Présélection ✅
- [x] Documentation du fonctionnement des tontines
- [x] Maquettes visuelles complètes (28 écrans)
- [x] Description de la composante blockchain
- [x] Site web vitrine

### Phase 2 — Demi-finale 🚧 (En cours)
- [x] Smart contract Solidity complet
- [x] Frontend React (28 pages)
- [x] Système de pénalités automatiques
- [x] KYC avec caméra
- [x] Système blacklist + remboursement
- [x] Hooks blockchain (useTontine, useMember, usePayment)
- [ ] Déploiement sur Polygon Mumbai
- [ ] Connexion frontend ↔ blockchain complète
- [ ] Tests du smart contract
- [ ] Démo live avec incidents simulés

### Phase 3 — Finale 🔮
- [ ] MVP complet fonctionnel
- [ ] Intégration MTN MoMo / Moov Money réelle
- [ ] Oracle Chainlink pour conversion FCFA
- [ ] Account Abstraction (ERC-4337)
- [ ] Gestion dissolution anticipée
- [ ] Super Admin dashboard
- [ ] Tests de sécurité (audit)
- [ ] Pitch 10 minutes

---

## 👥 Équipe

| Membre | Rôle |
|--------|------|
| **[Membre 1]** | Frontend Lead + Blockchain |
| **[Membre 2]** | Frontend Developer |
| **[Membre 3]** | Frontend Developer |
| **[Membre 4]** | Documentation + Pitch |

---

## 📊 Impact attendu

```
Sur les 400-600M USD de tontines béninoises :

✅ Élimination des détournements
✅ Réduction des incidents de 60%+ (référence Afrique de l'Est)
✅ Augmentation de l'épargne de 35%+
✅ Construction d'un historique d'épargne vérifiable
✅ Accès facilité au crédit formel
✅ Protection renforcée des 70% de participantes femmes
```

---

## 🏆 Hackathon

**MIABE HACKATHON 2026**  
Organisé par **DTC — Darollo Technologies Corporation**  
Thème : *La Blockchain, levier du développement durable africain*  
Catégorie : **D02 — Inclusion financière & DeFi**  
Projet : **B-01 TontineChain**

---

## 📄 Licence

Ce projet est développé dans le cadre du MIABE Hackathon 2026.  
Tous droits réservés © 2026 TontineChain Team.

---

<div align="center">

**Construit avec ❤️ pour le Bénin**

*"Le tisserand ne fait qu'un avec son pagne."*

</div>
