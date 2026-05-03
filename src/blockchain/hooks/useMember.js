// ================================
// useMember.js
// Hook pour les infos membres + KYC + Blacklist
// ================================

import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { getContract, connectWallet, formatBlockchainError, hashDocument } from "../provider";
import { KYC_DOCUMENT_TYPES, KYC_STATUS } from "../contract";

export function useMember() {
  const [wallet, setWallet] = useState(null);
  const [membre, setMembre] = useState(null);
  const [kycStatut, setKycStatut] = useState(null);
  const [blacklistInfo, setBlacklistInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [connecte, setConnecte] = useState(false);

  // ================================
  // CONNECTER LE WALLET
  // ================================
  const connecter = async () => {
    setLoading(true);
    setError(null);

    try {
      const { address } = await connectWallet();
      setWallet(address);
      setConnecte(true);

      // Charger les infos du membre
      await chargerInfosMembre(address);

      // Sauvegarder l'adresse
      localStorage.setItem("walletAddress", address);

      return { success: true, address };

    } catch (err) {
      const errorMsg = formatBlockchainError(err);
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // CHARGER INFOS MEMBRE
  // ================================
  const chargerInfosMembre = useCallback(async (walletAddress) => {
    if (!walletAddress) return;

    try {
      const contract = await getContract();

      // KYC
      const kyc = await contract.kycProfiles(walletAddress);
      setKycStatut({
        statut: Number(kyc.status),
        estApprouve: Number(kyc.status) === KYC_STATUS.APPROVED,
        estEnAttente: Number(kyc.status) === KYC_STATUS.PENDING,
        estRejete: Number(kyc.status) === KYC_STATUS.REJECTED,
        dateValidation: Number(kyc.validatedAt) > 0
          ? new Date(Number(kyc.validatedAt) * 1000)
          : null,
      });

      // Blacklist
      const blacklist = await contract.getBlacklistInfo(walletAddress);
      setBlacklistInfo({
        estBlackliste: blacklist.isBlacklisted,
        detteTotal: Number(ethers.formatEther(blacklist.totalDebt)),
        nbCreanciers: Number(blacklist.creditorsCount),
      });

    } catch (err) {
      console.error("Erreur chargerInfosMembre:", err);
    }
  }, []);

  // ================================
  // CHARGER INFOS MEMBRE DANS UNE TONTINE
  // ================================
  const getInfosDansTontine = async (tontineId, walletAddress) => {
    try {
      const contract = await getContract();
      const infos = await contract.getMemberInfo(tontineId, walletAddress);

      return {
        nom: infos.name,
        telephone: infos.phone,
        estActif: infos.isActive,
        nbPenalites: Number(infos.penaltyCount),
        totalPaye: Number(ethers.formatEther(infos.totalPaid)),
        aRecu: infos.hasReceived,
        scoreFiabilite: Number(infos.reliabilityScore),
      };

    } catch (err) {
      console.error("Erreur getInfosDansTontine:", err);
      return null;
    }
  };

  // ================================
  // SOUMETTRE KYC
  // ================================
  const soumettreKYC = async (documentFile, typeDocument) => {
    setLoading(true);
    setError(null);

    try {
      // Hasher le document
      const docHash = await hashDocument(documentFile);

      // Convertir en bytes32
      const docHashBytes32 = docHash.padEnd(66, "0");

      // Type de document
      const typeNum = KYC_DOCUMENT_TYPES[typeDocument] ?? 0;

      const contract = await getContract(true);
      const tx = await contract.submitKYC(docHashBytes32, typeNum);
      const receipt = await tx.wait();

      // Mettre à jour le statut local
      setKycStatut(prev => ({
        ...prev,
        statut: KYC_STATUS.PENDING,
        estEnAttente: true,
        estApprouve: false,
      }));

      return { success: true, txHash: receipt.hash };

    } catch (err) {
      const errorMsg = formatBlockchainError(err);
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // SCORE DE FIABILITÉ
  // ================================
  const getScoreFiabilite = async (tontineId, walletAddress) => {
    try {
      const contract = await getContract();
      const score = await contract.getMemberInfo(tontineId, walletAddress);
      return Number(score.reliabilityScore);
    } catch (err) {
      console.error("Erreur getScoreFiabilite:", err);
      return 100; // Score par défaut
    }
  };

  // ================================
  // REMBOURSER LA DETTE
  // ================================
  const getRemainingDebt = async (walletAddress) => {
    try {
      const contract = await getContract();
      const debt = await contract.getRemainingDebt(walletAddress);
      return {
        detteRestante: Number(ethers.formatEther(debt.remainingDebt)),
        nbCreanciers: Number(debt.creditorCount),
        partParCreancier: Number(ethers.formatEther(debt.sharePerCreditor)),
      };
    } catch (err) {
      console.error("Erreur getRemainingDebt:", err);
      return null;
    }
  };

  // ================================
  // SE DÉCONNECTER
  // ================================
  const deconnecter = () => {
    setWallet(null);
    setConnecte(false);
    setMembre(null);
    setKycStatut(null);
    setBlacklistInfo(null);
    localStorage.removeItem("walletAddress");
  };

  // Auto-reconnexion au chargement
  useEffect(() => {
    const savedWallet = localStorage.getItem("walletAddress");
    if (savedWallet) {
      setWallet(savedWallet);
      setConnecte(true);
      chargerInfosMembre(savedWallet);
    }
  }, [chargerInfosMembre]);

  return {
    wallet,
    membre,
    kycStatut,
    blacklistInfo,
    loading,
    error,
    connecte,
    connecter,
    deconnecter,
    chargerInfosMembre,
    getInfosDansTontine,
    soumettreKYC,
    getScoreFiabilite,
    getRemainingDebt,
  };
}