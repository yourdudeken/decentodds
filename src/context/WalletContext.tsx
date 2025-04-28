import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  balance: number;
  connectWallet: (type: 'metamask' | 'walletconnect') => void;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  address: null,
  balance: 0,
  connectWallet: () => {},
  disconnectWallet: () => {},
});

export const useWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);

  const connectWallet = useCallback((type: 'metamask' | 'walletconnect') => {
    // In a real implementation, this would connect to the actual wallet
    // For the purpose of this demo, we'll simulate a successful connection
    const mockAddress = '0x' + [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    const mockBalance = Math.floor(Math.random() * 10000) / 100;
    
    setIsConnected(true);
    setAddress(mockAddress);
    setBalance(mockBalance);
    
    console.log(`Connected to ${type} wallet with address ${mockAddress}`);
  }, []);

  const disconnectWallet = useCallback(() => {
    setIsConnected(false);
    setAddress(null);
    setBalance(0);
  }, []);

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        balance,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};