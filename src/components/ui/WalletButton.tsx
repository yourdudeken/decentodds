import React, { useState } from 'react';
import { Wallet, LogOut } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import Button from './Button';

declare global {
  interface Window {
    ethereum?: any;
    solana?: {
      isPhantom?: boolean;
      connect: () => Promise<{publicKey: {toString: () => string}}>;
    };
  }
}

const WalletButton = () => {
  const { 
    isConnected, 
    address, 
    connectWallet, 
    disconnectWallet,
    loading,
    error
  } = useWallet();
  const [showWalletList, setShowWalletList] = useState(false);

  const supportedWallets = [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg'
    },
    {
      id: 'phantom',
      name: 'Phantom',
      icon: 'https://phantom.app/favicon.ico'
    }
  ];

  const handleConnect = async (walletType: string) => {
    try {
      let walletAddress = '';
      if (walletType === 'metamask') {
        if (!window.ethereum) throw new Error('MetaMask not installed');
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        walletAddress = accounts[0];
      } else if (walletType === 'phantom') {
        if (!window.solana?.isPhantom) throw new Error('Phantom not installed');
        const response = await window.solana.connect();
        walletAddress = response.publicKey.toString();
      }

      await connectWallet(walletType, walletAddress);
      setShowWalletList(false);
    } catch (err) {
      console.error('Failed to connect wallet:', err);
    }
  };

  if (loading) {
    return <Button variant="primary" disabled>Connecting...</Button>;
  }

  if (isConnected) {
    return (
      <div className="relative">
        <Button
          variant="outline"
          onClick={() => disconnectWallet()}
          rightIcon={<LogOut size={14} />}
        >
          {`${address?.substring(0, 6)}...${address?.substring(38)}`}
        </Button>
      </div>
    );
  }

  return (
    <div className="relative">
      <Button
        variant="primary"
        onClick={() => setShowWalletList(!showWalletList)}
        leftIcon={<Wallet size={16} />}
      >
        Connect Wallet
      </Button>

      {showWalletList && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
          {supportedWallets.map((wallet) => (
            <button
              key={wallet.id}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
              onClick={() => handleConnect(wallet.id)}
            >
              <img 
                src={wallet.icon} 
                alt={wallet.name}
                className="w-5 h-5 mr-2 rounded-full"
              />
              {wallet.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default WalletButton;
