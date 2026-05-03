// ================================
// useTontine.js
// Hook pour interagir avec les tontines
// ================================

import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { getContract, formatBlockchainError } from "../provider";
import { FREQUENCIES } from "../contract";

// ================================
// HOOK PRINCIPAL
// ================================
export function useTontine(tontineId = null) {
  const [tontine, setTontine] = useState(null);
  const [paiements, setPaiements] = useState(null);
  const [beneficiaire, setBeneficiaire] = useState(null);
  const [historique, setHistorique] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charger les détails d'une tontine
  const loadTontine = useCallback(async () => {
    if (!tontineId) return;
    setLoading(true);
    setError(null);

    try {
      const contract = await getContract();

      // Détails de la tontine
      const details = await contract.getTontineDetails(tontineId);
      setTontine({
        id: tontineId,
        nom: details.name,
        organisateur: details.organizer,
        montantCotisation: Number(ethers.formatEther(details.contributionAmount)),
        montantCotisationFCFA: convertMATICtoFCFA(ethers.formatEther(details.contributionAmount)),
        frequence: Number(details.frequency) === FREQUENCIES.HEBDOMADAIRE ? "hebdomadaire" : "mensuel",
        maxMembres: Number(details.maxMembers),
        membresActuels: Number(details.currentMembers),
        tourActuel: Number(details.currentRound),
        totalCollecte: Number(ethers.formatEther(details.totalCollected)),
        caisseCommune: Number(ethers.formatEther(details.commonFundAmount)),
        estActive: details.isActive,
        estAleatoire: details.isRandomOrder,
        codeInvitation: details.invitationCode,
        organisateurParticipe: details.orgParticipates,
      });

      // État des paiements
      const statuts = await contract.getPaymentStatus(tontineId);
      const membresAvecStatut = statuts.wallets.map((wallet, i) => ({
        wallet,
        nom: statuts.names[i],
        aPaye: statuts.paid[i],
        joursRetard: Number(statuts.daysLate[i]),
      }));
      setPaiements({
        membres: membresAvecStatut,
        totalPaye: Number(statuts.totalPaid),
        totalMembres: Number(statuts.totalMembers),
      });

      // Bénéficiaire du tour
      try {
        const benef = await contract.getCurrentBeneficiary(tontineId);
        setBeneficiaire({
          wallet: benef.wallet,
          nom: benef.name,
          tour: Number(benef.roundNumber),
          montantAttendu: Number(ethers.formatEther(benef.expectedAmount)),
        });
      } catch (e) {
        // Pas de bénéficiaire (tontine non commencée)
        setBeneficiaire(null);
      }

    } catch (err) {
      setError(formatBlockchainError(err));
      console.error("Erreur loadTontine:", err);
    } finally {
      setLoading(false);
    }
  }, [tontineId]);

  useEffect(() => {
    loadTontine();
  }, [loadTontine]);

  // ================================
  // CRÉER UNE TONTINE
  // ================================
  const creerTontine = async ({
    nom, montant, frequence, maxMembres,
    dateDebut, estAleatoire, organisateurParticipe
  }) => {
    setLoading(true);
    setError(null);

    try {
      const contract = await getContract(true);

      const frequenceJours = frequence === "hebdomadaire"
        ? FREQUENCIES.HEBDOMADAIRE
        : FREQUENCIES.MENSUEL;

      const dateDepartTimestamp = Math.floor(new Date(dateDebut).getTime() / 1000);

      // Convertir FCFA en Wei (simulation)
      const montantWei = ethers.parseEther(convertFCFAtoMATIC(montant).toString());

      const tx = await contract.createTontine(
        nom,
        montantWei,
        frequenceJours,
        maxMembres,
        dateDepartTimestamp,
        estAleatoire,
        organisateurParticipe
      );

      const receipt = await tx.wait();

      // Extraire l'ID de la tontine depuis les events
      const event = receipt.logs.find(log => {
        try {
          const parsed = contract.interface.parseLog(log);
          return parsed.name === "TontineCreated";
        } catch { return false; }
      });

      let newTontineId = null;
      if (event) {
        const parsed = contract.interface.parseLog(event);
        newTontineId = Number(parsed.args.id);
      }

      return { success: true, tontineId: newTontineId, txHash: receipt.hash };

    } catch (err) {
      const errorMsg = formatBlockchainError(err);
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // REJOINDRE UNE TONTINE
  // ================================
  const rejoindre = async ({ code, nom, telephone }) => {
    setLoading(true);
    setError(null);

    try {
      const contract = await getContract(true);

      const tx = await contract.joinTontineByCode(code, nom, telephone);
      const receipt = await tx.wait();

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
  // APERÇU D'UNE TONTINE (avant rejoindre)
  // ================================
  const getApercu = async (code) => {
    setLoading(true);
    setError(null);

    try {
      const contract = await getContract();
      const preview = await contract.getTontinePreview(code);

      return {
        success: true,
        tontine: {
          nom: preview.name,
          organisateur: preview.organizer,
          montant: convertMATICtoFCFA(ethers.formatEther(preview.contributionAmount)),
          frequence: Number(preview.frequency) === FREQUENCIES.HEBDOMADAIRE ? "Hebdomadaire" : "Mensuel",
          membresActuels: Number(preview.currentMembers),
          maxMembres: Number(preview.maxMembers),
        }
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
  // DÉFINIR L'ORDRE DES BÉNÉFICIAIRES
  // ================================
  const definirOrdre = async (tontineId, wallets) => {
    setLoading(true);
    setError(null);

    try {
      const contract = await getContract(true);
      const tx = await contract.setBeneficiaryOrder(tontineId, wallets);
      const receipt = await tx.wait();

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
  // TONTINES D'UN UTILISATEUR
  // ================================
  const getMesTontines = async (walletAddress) => {
    try {
      const contract = await getContract();
      const ids = await contract.getUserTontines(walletAddress);
      return ids.map(id => Number(id));
    } catch (err) {
      console.error("Erreur getMesTontines:", err);
      return [];
    }
  };

  return {
    tontine,
    paiements,
    beneficiaire,
    historique,
    loading,
    error,
    loadTontine,
    creerTontine,
    rejoindre,
    getApercu,
    definirOrdre,
    getMesTontines,
  };
}

// ================================
// HELPERS INTERNES
// ================================
function convertFCFAtoMATIC(fcfa) {
  const RATE = 350;
  return (fcfa / RATE).toFixed(6);
}

function convertMATICtoFCFA(matic) {
  const RATE = 350;
  return Math.round(parseFloat(matic) * RATE);
}