# 🔗 TontineChain

> **Votre tontine, protégée et transparente**

[![Polygon](https://img.shields.io/badge/Blockchain-Polygon-8247E5)](https://polygon.technology)
[![Solidity](https://img.shields.io/badge/Smart%20Contract-Solidity%200.8.19-363636)](https://soliditylang.org)
[![React](https://img.shields.io/badge/Frontend-React%2018-61DAFB)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/CSS-TailwindCSS-38BDF8)](https://tailwindcss.com)
[![MIABE 2026](https://img.shields.io/badge/MIABE%20Hackathon-2026-1B5E4B)](https://miabehackathon.com)

**Projet B-01 — Catégorie D02 : Inclusion financière & DeFi**  
**MIABE Hackathon 2026 — DTC Darollo Technologies Corporation**

---

## 📖 Description de la solution

**TontineChain** est une application décentralisée (DApp) qui sécurise les tontines béninoises grâce à la blockchain Polygon.

Au Bénin, **60 à 70% des adultes** participent à des tontines — des groupes d'épargne informels qui brassent **400 à 600 millions USD par an**. Mais **15 à 20% d'entre elles** connaissent chaque année un incident grave : organisateurs qui disparaissent avec la caisse, membres qui refusent de payer, litiges sur l'ordre de tirage — sans aucun recours légal.

### Comment TontineChain résout ce problème

TontineChain encode les règles de chaque tontine dans un **smart contract Solidity** déployé sur Polygon. Une fois créées, ces règles sont **immuables et automatiquement appliquées** — personne, pas même l'organisateur, ne peut les modifier ou les contourner.

```
L'organisateur crée la tontine et définit les règles.
Après ça → la blockchain gère TOUT automatiquement :
  ✅ Enregistrement des cotisations
  ✅ Libération automatique de la cagnotte
  ✅ Pénalités en cas de retard
  ✅ Exclusions automatiques
  ✅ Signalement aux autorités
  ✅ Remboursements
  ✅ Distribution de la caisse commune
```

---

## 🛠️ Technologies utilisées

| Couche | Technologie | Rôle |
|--------|-------------|------|
| **Smart Contract** | Solidity 0.8.19 | Encode et exécute toutes les règles de la tontine |
| **Blockchain** | Polygon PoS | Registre immuable — frais < 0,01 USD par transaction |
| **Frontend** | React 18 + TailwindCSS | Interface web responsive (mobile-first) |
| **Connexion blockchain** | Ethers.js v6 | Communication entre React et le smart contract |
| **Wallet** | MetaMask | Connexion et signature des transactions |
| **Paiement** | MTN MoMo / Moov Money | Paiement en FCFA depuis l'application |
| **Vérification identité** | KYC Oracle (DTC) | Vérification automatique des documents |
| **Routage** | React Router DOM v6 | Navigation entre les pages |

---

## ⚙️ Instructions d'installation

### Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org) version **18 ou supérieure**
- [npm](https://npmjs.com) version **9 ou supérieure**
- [MetaMask](https://metamask.io) installé dans votre navigateur
- Du MATIC de test sur le réseau **Polygon Mumbai** → [Faucet gratuit](https://faucet.polygon.technology)

### Étape 1 — Cloner le projet

```bash
git clone https://github.com/votre-equipe/tontinechain.git
cd tontinechain
```

### Étape 2 — Installer les dépendances

```bash
npm install
```

### Étape 3 — Configurer les variables d'environnement

```bash
cp .env.example .env
```

Ouvrez le fichier `.env` et remplissez les valeurs :

```env
# Adresse du smart contract déployé sur Polygon Mumbai
REACT_APP_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000

# Réseau : mumbai (testnet) ou polygon (mainnet)
REACT_APP_NETWORK=mumbai

# Clé privée pour déployer le contrat (NE PAS PARTAGER)
PRIVATE_KEY=votre_cle_privee_ici

# API Key PolygonScan pour vérifier le contrat
POLYGONSCAN_API_KEY=votre_api_key_ici
```

> ⚠️ **Important** : Ne commitez jamais votre fichier `.env` sur GitHub. Il est dans `.gitignore`.

### Étape 4 — Lancer l'application en développement

```bash
npm start
```

L'application s'ouvre automatiquement sur **http://localhost:3000**

### Étape 5 (Optionnel) — Déployer le smart contract

```bash
# Installer Hardhat
npm install -D hardhat @nomicfoundation/hardhat-toolbox

# Compiler le contrat
npx hardhat compile

# Déployer sur Polygon Mumbai (testnet)
npx hardhat run scripts/deploy.js --network mumbai

# Vérifier sur PolygonScan
npx hardhat verify --network mumbai ADRESSE_DU_CONTRAT
```

Après le déploiement, copiez l'adresse du contrat dans `src/blockchain/contract.js` :

```javascript
export const CONTRACT_ADDRESS = "0xVOTRE_ADRESSE_ICI";
```

---

## 🚀 Instructions d'utilisation

### En tant qu'Organisateur

**1. Créer un compte**
```
Ouvrir l'app → Commencer → Organisateur
→ Entrer nom + téléphone + ville
→ Vérifier par SMS
→ Créer un code PIN à 6 chiffres
→ Passer le KYC (photo de document + selfie)
```

**2. Créer une tontine**
```
Dashboard → Bouton + (créer)
→ Étape 1 : Définir les règles
  - Nom de la tontine
  - Montant de cotisation (FCFA)
  - Fréquence (hebdomadaire ou mensuelle)
  - Date de début + Nombre max de membres
  - Je participe ou non ?

→ Étape 2 : Ajouter les membres
  - Par numéro de téléphone
  - Par SMS (lien d'invitation)

→ Étape 3 : Ordre des bénéficiaires
  - Tirage au sort automatique
  - OU ordre manuel (glisser-déposer)

→ Confirmation → Smart contract déployé !
```

**3. Partager le code d'invitation**
```
Copier le code → Partager le lien → QR Code
Les membres rejoignent avec ce code
```

**4. Suivre la tontine**
```
Dashboard → Gérer → Voir qui a payé en temps réel
Les pénalités et exclusions sont gérées automatiquement
```

---

### En tant que Membre

**1. Créer un compte** *(même procédure que l'organisateur)*

**2. Rejoindre une tontine**
```
Dashboard → + → Rejoindre une tontine
→ Entrer le code d'invitation OU Scanner le QR code
→ Vérifier les détails
→ Confirmer
```

**3. Payer sa cotisation**
```
Dashboard → Payer maintenant
→ Choisir MTN MoMo ou Moov Money
→ Confirmer le paiement
→ Reçu avec référence blockchain généré
```

**4. Suivre son tour**
```
Ma Tontine → Suivi du tour
→ Voir qui a payé / en attente
→ Voir la cagnotte actuelle
→ Voir quand vous recevrez votre cagnotte
```

---

## ✨ Fonctionnalités principales développées

### 🔐 Authentification & Identité
- Inscription avec numéro de téléphone béninois (+229)
- Vérification par SMS en temps réel
- Code PIN à 6 chiffres + authentification biométrique
- **KYC automatique** : photo du document (CNI/CIP/Passeport) + selfie avec détection de visage via caméra
- Hash cryptographique du document stocké on-chain (le document n'est jamais stocké)
- Validation automatique via oracle DTC officiel

### 🏦 Création et gestion de tontine
- Création de tontine avec règles entièrement personnalisables
- Deux méthodes d'ordre des bénéficiaires : **tirage au sort** ou **ordre manuel** (drag & drop)
- Invitation des membres par **numéro de téléphone**, **code unique** ou **QR code**
- Participation optionnelle de l'organisateur (s'il participe, toutes les règles membres lui s'appliquent)
- Code d'invitation unique généré et stocké sur la blockchain
- Aperçu des détails de la tontine avant de rejoindre

### 💳 Paiements et cotisations
- Paiement via **MTN Mobile Money** ou **Moov Money**
- Confirmation de paiement avec **référence blockchain** (hash de transaction)
- Reçu numérique téléchargeable
- Suivi en temps réel de qui a payé pour le tour en cours
- **Libération automatique** de la cagnotte dès que tous les membres ont cotisé

### ⚖️ Système de pénalités 100% automatique
Deux cas de figure gérés automatiquement par le smart contract :

**CAS 1 — Membre ayant déjà reçu sa cagnotte**
| Jour | Action automatique |
|------|--------------------|
| Jour 1 | Pénalité 10% du montant de cotisation |
| Jour 2 | Avertissement automatique |
| Jour 3 | Double pénalité 20% |
| Jour 4+ | Signalement aux autorités + preuve blockchain immuable |

**CAS 2 — Membre n'ayant pas encore reçu**
| Jour | Action automatique |
|------|--------------------|
| Jour 1 | Pénalité 10% du montant de cotisation |
| Jour 2 | Avertissement automatique |
| Jour 3 | Exclusion définitive + dette enregistrée blockchain |

### 🚫 Système anti-fraude et blacklist
- **Blacklist globale** : un membre exclu ne peut plus rejoindre aucune tontine TontineChain
- **Remboursement** partiel ou total de la dette pour lever la blacklist
- Distribution automatique aux créanciers proportionnellement
- **Signalement aux autorités** avec preuve immuable sur la blockchain
- Numéro officiel DTC codé dans le contrat (immuable, ne peut pas être falsifié)

### 📊 Transparence et suivi
- Dashboard organisateur avec progression de chaque tontine
- Dashboard membre avec compte à rebours jusqu'à son tour
- **Score de fiabilité** calculé automatiquement (0-100%) basé sur les pénalités
- Historique complet de toutes les transactions avec hash blockchain
- Notifications en temps réel (paiements, décaissements, rappels, incidents)
- Journal d'activités horodaté et filtrable

### 🖥️ Interface responsive
- Design **mobile-first** fidèle aux maquettes
- Adaptation **desktop** avec sidebar de navigation
- Compatible avec tous les navigateurs modernes
- Thème vert (#1B5E4B) et orange (#F5A623) inspiré de l'identité visuelle TontineChain

---

## 📁 Structure du projet

```
tontinechain/
├── src/
│   ├── blockchain/
│   │   ├── contract.js          # ABI + adresse du contrat
│   │   ├── provider.js          # Connexion MetaMask + utilitaires
│   │   └── hooks/
│   │       ├── useTontine.js    # Créer, rejoindre, gérer les tontines
│   │       ├── useMember.js     # KYC, blacklist, score de fiabilité
│   │       └── usePayment.js    # Payer, rembourser, écouter les événements
│   ├── pages/
│   │   ├── auth/                # Inscription, Vérification, PIN, KYC, Connexion
│   │   ├── organisateur/        # Dashboard, Création (3 étapes), Gestion, Incidents
│   │   ├── membre/              # Dashboard, Rejoindre, Paiement, Suivi, Historique
│   │   └── shared/              # Profil, Notifications
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── BlockchainContext.jsx
│   └── App.jsx
├── contracts/
│   └── TontineChain.sol         # Smart contract principal (1265 lignes)
├── scripts/
│   └── deploy.js
├── .env.example
└── README.md
```

---

## 🌍 Impact attendu

| Indicateur | Objectif |
|------------|----------|
| Incidents de fraude | Réduction de **60%+** (référence projets Afrique de l'Est) |
| Épargne collective | Augmentation de **35%+** |
| Accès au crédit formel | Historique d'épargne vérifiable sur blockchain |
| Protection des femmes | 70% des participantes directement protégées |
| Transparence | 100% des transactions vérifiables publiquement |
