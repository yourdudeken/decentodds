import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, BarChart2, Wallet, Gift, User, Settings, HelpCircle } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-dark-900 shadow-xl">
        <div className="flex items-center justify-between h-16 px-6 border-b border-dark-700">
          <span className="font-display font-bold text-lg">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-dark-800 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="px-3 py-4">
          <ul className="space-y-1">
            <li>
              <Link
                to="/"
                onClick={onClose}
                className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  isActive('/') 
                    ? 'bg-primary-600/20 text-primary-400' 
                    : 'text-dark-100 hover:bg-dark-800'
                }`}
              >
                <Home size={20} className="mr-3" />
                Home
              </Link>
            </li>
            
            <li>
              <Link
                to="/marketplace"
                onClick={onClose}
                className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  isActive('/marketplace') 
                    ? 'bg-primary-600/20 text-primary-400' 
                    : 'text-dark-100 hover:bg-dark-800'
                }`}
              >
                <BarChart2 size={20} className="mr-3" />
                Marketplace
              </Link>
            </li>
            
            <li>
              <Link
                to="/profile"
                onClick={onClose}
                className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  isActive('/profile') 
                    ? 'bg-primary-600/20 text-primary-400' 
                    : 'text-dark-100 hover:bg-dark-800'
                }`}
              >
                <User size={20} className="mr-3" />
                Profile
              </Link>
            </li>
            
            <li>
              <Link
                to="/airdrop"
                onClick={onClose}
                className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  isActive('/airdrop') 
                    ? 'bg-primary-600/20 text-primary-400' 
                    : 'text-dark-100 hover:bg-dark-800'
                }`}
              >
                <Gift size={20} className="mr-3" />
                Airdrop
              </Link>
            </li>
            
            <li className="border-t border-dark-700 pt-2 mt-2">
              <Link
                to="/settings"
                onClick={onClose}
                className="flex items-center px-4 py-3 text-base font-medium rounded-lg text-dark-100 hover:bg-dark-800 transition-colors"
              >
                <Settings size={20} className="mr-3" />
                Settings
              </Link>
            </li>
            
            <li>
              <Link
                to="/help"
                onClick={onClose}
                className="flex items-center px-4 py-3 text-base font-medium rounded-lg text-dark-100 hover:bg-dark-800 transition-colors"
              >
                <HelpCircle size={20} className="mr-3" />
                Help Center
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;