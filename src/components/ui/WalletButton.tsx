import React, { useState } from 'react';
import { Wallet, LogOut, ChevronDown } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import Button from './Button';

const WalletButton = () => {
  const { isConnected, address, connectWallet, disconnectWallet } = useWallet();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  if (isConnected && address) {
    return (
      <div className="relative">
        <Button
          variant="outline"
          onClick={toggleDropdown}
          rightIcon={<ChevronDown size={14} />}
          className="border-dark-700 bg-dark-800/50 hover:bg-dark-700/70"
        >
          <span className="flex items-center">
            <span className="mr-2 h-2 w-2 rounded-full bg-success-500"></span>
            {formatAddress(address)}
          </span>
        </Button>
        
        {isDropdownOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={closeDropdown}
            ></div>
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-dark-800 border border-dark-700 overflow-hidden z-20 animate-fade-in">
              <div className="py-1">
                <button
                  onClick={() => {
                    disconnectWallet();
                    closeDropdown();
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-dark-200 hover:bg-dark-700 flex items-center"
                >
                  <LogOut size={16} className="mr-2 text-dark-400" />
                  Disconnect Wallet
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <Button 
        variant="primary"
        onClick={() => connectWallet('metamask')}
        leftIcon={<Wallet size={16} />}
      >
        Connect Wallet
      </Button>
    </div>
  );
};

export default WalletButton;