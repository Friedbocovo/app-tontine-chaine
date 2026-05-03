// ================================
// usePayment.js
// Hook pour les paiements de cotisation
// ================================

import { useState } from "react";
import { ethers } from "ethers";
import { getContract, formatBlockchainError } from "../provider";

export function usePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [txHash, setTxHash] = useState(null);

  // ================================
  // PAYER LA COTISATION
  // ================================
  const payerCotisation = async (tontineId, montantFCFA) => {
    setLoading(true);
    setError(null);
    setTxHash(null);

    try {
      const contract = await getContract(true);

      // Convertir FCFA → MATIC → Wei
      const RATE = 350;
      const montantMATIC = (montantFCFA / RATE).toFixed(6);
      const montantWei = ethers.parseEther(montantMATIC);

      const tx = await contract.payContribution(tontineId, {
        value: montantWei,
      });

      const receipt = await tx.wait();
      setTxHash(receipt.hash);

      return {
        success: true,
        txHash: receipt.hash,
        blockNumber: receipt.blockNumber,
      };

    } catch (err) {
      const errorMsg = formatBlockchainError(err);
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // REMBOURSER UNE DETTE (blacklist)
  // ================================
  const rembourserDette = async (montantFCFA) => {
    setLoading(true);
    setError(null);

    try {
      const contract = await getContract(true);

      const RATE = 350;
      const montantMATIC = (montantFCFA / RATE).toFixed(6);
      const montantWei = ethers.parseEther(montantMATIC);

      const tx = await contract.repayDebt({ value: montantWei });
      const receipt = await tx.wait();
      setTxHash(receipt.hash);

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
  // VÉRIFIER SI DÉJÀ PAYÉ CE TOUR
  // ================================
  const verifierPaiement = async (tontineId, walletAddress) => {
    try {
      const contract = await getContract();
      const statuts = await contract.getPaymentStatus(tontineId);

      const index = statuts.wallets.findIndex(
        w => w.toLowerCase() === walletAddress.toLowerCase()
      );

      if (index === -1) return { aPaye: false, estMembre: false };

      return {
        aPaye: statuts.paid[index],
        estMembre: true,
        joursRetard: Number(statuts.daysLate[index]),
      };

    } catch (err) {
      console.error("Erreur verifierPaiement:", err);
      return { aPaye: false, estMembre: false };
    }
  };

  // ================================
  // ÉCOUTER LES ÉVÉNEMENTS EN TEMPS RÉEL
  // ================================
  const ecouterPaiements = async (tontineId, callback) => {
    try {
      const contract = await getContract();

      contract.on("ContributionPaid", (tontId, round, member, amount) => {
        if (Number(tontId) === Number(tontineId)) {
          callback({
            type: "PAIEMENT",
            tontineId: Number(tontId),
            round: Number(round),
            member,
            montant: Number(ethers.formatEther(amount)),
          });
        }
      });

      contract.on("PotReleased", (tontId, round, beneficiary, amount) => {
        if (Number(tontId) === Number(tontineId)) {
          callback({
            type: "LIBERATION",
            tontineId: Number(tontId),
            round: Number(round),
            beneficiary,
            montant: Number(ethers.formatEther(amount)),
          });
        }
      });

      contract.on("PenaltyApplied", (tontId, member, amount, recipient, percentage) => {
        if (Number(tontId) === Number(tontineId)) {
          callback({
            type: "PENALITE",
            tontineId: Number(tontId),
            member,
            montant: Number(ethers.formatEther(amount)),
            pourcentage: Number(percentage),
          });
        }
      });

      contract.on("MemberExcluded", (tontId, member) => {
        if (Number(tontId) === Number(tontineId)) {
          callback({
            type: "EXCLUSION",
            tontineId: Number(tontId),
            member,
          });
        }
      });

      // Retourner une fonction pour arrêter l'écoute
      return () => contract.removeAllListeners();

    } catch (err) {
      console.error("Erreur ecouterPaiements:", err);
      return () => {};
    }
  };

  return {
    loading,
    error,
    txHash,
    payerCotisation,
    rembourserDette,
    verifierPaiement,
    ecouterPaiements,
  };
}