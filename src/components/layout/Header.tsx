//import React from 'react';
import { Link } from 'react-router-dom';
import { Menu,/* X, ArrowRightCircle,*/ ChevronDown } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import WalletButton from '../ui/WalletButton';
import TokenDisplay from '../ui/TokenDisplay';
import Logo from '../ui/Logo';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const { isConnected } = useWallet();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-dark-900/90 backdrop-blur-md z-50 border-b border-dark-700 shadow-md px-4 flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="mr-4 p-2 rounded-lg hover:bg-dark-800 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
        
        <Link to="/" className="flex items-center">
          <Logo size={32} />
          <span className="ml-2 font-display text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            DecentOdds
          </span>
        </Link>
      </div>

      <nav className="hidden md:flex items-center space-x-1 font-medium text-sm">
        <Link to="/" className="px-3 py-2 rounded-lg hover:bg-dark-800 transition-colors">
          Home
        </Link>
        <Link to="/marketplace" className="px-3 py-2 rounded-lg hover:bg-dark-800 transition-colors">
          Marketplace
        </Link>
        <div className="relative group">
          <button className="px-3 py-2 rounded-lg hover:bg-dark-800 transition-colors flex items-center">
            Learn <ChevronDown size={16} className="ml-1" />
          </button>
          <div className="absolute left-0 mt-1 w-52 rounded-md shadow-lg bg-dark-800 border border-dark-700 overflow-hidden origin-top-left opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 scale-95 group-hover:scale-100 z-50">
            <div className="py-2">
              <a href="#" className="block px-4 py-2 hover:bg-primary-600/20">How It Works</a>
              <a href="#" className="block px-4 py-2 hover:bg-primary-600/20">Tokenomics</a>
              <a href="#" className="block px-4 py-2 hover:bg-primary-600/20">FAQ</a>
            </div>
          </div>
        </div>
        <Link to="/airdrop" className="px-3 py-2 rounded-lg hover:bg-dark-800 transition-colors">
          Airdrop
        </Link>
      </nav>

      <div className="flex items-center space-x-3">
        {isConnected && <TokenDisplay />}
        <WalletButton />
      </div>
    </header>
  );
};

export default Header;
