// ================================
// BlockchainContext.jsx
// Context global pour la blockchain
// ================================

import { createContext, useContext, useState, useEffect } from "react";
import { useMember } from "../blockchain/hooks/useMember";
import { onAccountsChanged, onChainChanged, removeListeners } from "../blockchain/provider";

const BlockchainContext = createContext(null);

export function BlockchainProvider({ children }) {
  const membre = useMember();
  const [mauvaisReseau, setMauvaisReseau] = useState(false);

  // Écouter les changements de compte et de réseau
  useEffect(() => {
    onAccountsChanged((accounts) => {
      if (accounts.length === 0) {
        membre.deconnecter();
      } else {
        membre.chargerInfosMembre(accounts[0]);
      }
    });

    onChainChanged((chainId) => {
      // Polygon Mumbai = 0x13881
      setMauvaisReseau(chainId !== "0x13881" && chainId !== "0x89");
      window.location.reload();
    });

    return () => removeListeners();
  }, [membre]);

  return (
    <BlockchainContext.Provider
      value={{
        ...membre,
        mauvaisReseau,
      }}
    >
      {/* Alerte mauvais réseau */}
      {mauvaisReseau && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white text-xs text-center py-2 font-semibold">
          ⚠️ Mauvais réseau détecté. Veuillez vous connecter à Polygon.
        </div>
      )}
      {children}
    </BlockchainContext.Provider>
  );
}

export function useBlockchain() {
  const ctx = useContext(BlockchainContext);
  if (!ctx) throw new Error("useBlockchain doit être utilisé dans BlockchainProvider");
  return ctx;
}