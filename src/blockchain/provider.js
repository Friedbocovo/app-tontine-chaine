// ================================
// PROVIDER.JS
// Connexion wallet + instance contrat
// ================================

import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI, NETWORK } from "./contract";

// ================================
// VÉRIFIER SI METAMASK EST INSTALLÉ
// ================================
export const isMetaMaskInstalled = () => {
  return typeof window !== "undefined" && typeof window.ethereum !== "undefined";
};

// ================================
// CONNEXION AU WALLET
// ================================
export const connectWallet = async () => {
  if (!isMetaMaskInstalled()) {
    throw new Error(
      "MetaMask n'est pas installé. Veuillez installer MetaMask pour continuer."
    );
  }

  try {
    // Demander accès au wallet
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (!accounts || accounts.length === 0) {
      throw new Error("Aucun compte trouvé. Veuillez vous connecter à MetaMask.");
    }

    // Vérifier et changer le réseau si nécessaire
    await switchToPolygon();

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    return { provider, signer, address };

  } catch (error) {
    if (error.code === 4001) {
      throw new Error("Connexion refusée par l'utilisateur.");
    }
    throw error;
  }
};

// ================================
// CHANGER VERS POLYGON
// ================================
export const switchToPolygon = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: NETWORK.chainId }],
    });
  } catch (switchError) {
    // Le réseau n'existe pas encore → l'ajouter
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [NETWORK],
        });
      } catch (addError) {
        throw new Error("Impossible d'ajouter le réseau Polygon.");
      }
    } else {
      throw switchError;
    }
  }
};

// ================================
// OBTENIR L'INSTANCE DU CONTRAT
// ================================
export const getContract = async (withSigner = false) => {
  if (!isMetaMaskInstalled()) {
    // Mode lecture seule avec provider public
    const provider = new ethers.JsonRpcProvider(NETWORK.rpcUrls[0]);
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  }

  const provider = new ethers.BrowserProvider(window.ethereum);

  if (withSigner) {
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  }

  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
};

// ================================
// OBTENIR LE SOLDE DU WALLET
// ================================
export const getWalletBalance = async (address) => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error("Erreur lors de la récupération du solde:", error);
    return "0";
  }
};

// ================================
// ÉCOUTER LES CHANGEMENTS DE COMPTE
// ================================
export const onAccountsChanged = (callback) => {
  if (!isMetaMaskInstalled()) return;
  window.ethereum.on("accountsChanged", callback);
};

// ================================
// ÉCOUTER LES CHANGEMENTS DE RÉSEAU
// ================================
export const onChainChanged = (callback) => {
  if (!isMetaMaskInstalled()) return;
  window.ethereum.on("chainChanged", callback);
};

// ================================
// SUPPRIMER LES ÉCOUTEURS
// ================================
export const removeListeners = () => {
  if (!isMetaMaskInstalled()) return;
  window.ethereum.removeAllListeners("accountsChanged");
  window.ethereum.removeAllListeners("chainChanged");
};

// ================================
// FORMATER ERREURS BLOCKCHAIN
// ================================
export const formatBlockchainError = (error) => {
  if (!error) return "Erreur inconnue";

  // Erreurs MetaMask communes
  if (error.code === 4001) return "Transaction refusée par l'utilisateur.";
  if (error.code === -32002) return "MetaMask est déjà en attente d'une action.";
  if (error.code === -32603) return "Erreur interne du réseau.";

  // Erreurs contrat
  if (error.message?.includes("insufficient funds"))
    return "Fonds insuffisants pour cette transaction.";
  if (error.message?.includes("Montant incorrect"))
    return "Le montant envoyé ne correspond pas à la cotisation.";
  if (error.message?.includes("deja paye"))
    return "Vous avez déjà payé votre cotisation pour ce tour.";
  if (error.message?.includes("blackliste"))
    return "Votre compte est blacklisté. Remboursez votre dette pour continuer.";
  if (error.message?.includes("KYC"))
    return "Votre KYC n'est pas validé. Complétez la vérification d'identité.";

  return error.reason || error.message || "Une erreur est survenue.";
};

// ================================
// CONVERTIR FCFA → MATIC (SIMULATION)
// En production → utiliser un oracle
// ================================
export const convertFCFAtoMATIC = (fcfa) => {
  // 1 MATIC ≈ 350 FCFA (à titre d'exemple)
  // En production → utiliser Chainlink price feed
  const RATE = 350;
  return (fcfa / RATE).toFixed(6);
};

// ================================
// CONVERTIR MATIC → FCFA
// ================================
export const convertMATICtoFCFA = (matic) => {
  const RATE = 350;
  return Math.round(parseFloat(matic) * RATE);
};

// ================================
// HASH D'UN DOCUMENT (KYC)
// ================================
export const hashDocument = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const buffer = e.target.result;
        const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = "0x" + hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
        resolve(hashHex);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};