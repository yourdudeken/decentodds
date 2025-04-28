//import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart2, Gift, User, Settings, HelpCircle, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-40 w-64 pt-16 bg-dark-900/95 backdrop-blur-md border-r border-dark-700 transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-dark-800 transition-colors text-gray-400 hover:text-white"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      )}
      <div className="h-full flex flex-col justify-between py-6 px-4">
        <nav className="flex-1 px-2 space-y-1">
          <Link
            to="/"
            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
              isActive('/') 
                ? 'bg-primary-600/20 text-primary-400' 
                : 'text-dark-100 hover:bg-dark-800'
            }`}
          >
            <Home size={20} className="mr-3" />
            Home
          </Link>
          
          <Link
            to="/marketplace"
            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
              isActive('/marketplace') 
                ? 'bg-primary-600/20 text-primary-400' 
                : 'text-dark-100 hover:bg-dark-800'
            }`}
          >
            <BarChart2 size={20} className="mr-3" />
            Marketplace
          </Link>
          
          <Link
            to="/profile"
            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
              isActive('/profile') 
                ? 'bg-primary-600/20 text-primary-400' 
                : 'text-dark-100 hover:bg-dark-800'
            }`}
          >
            <User size={20} className="mr-3" />
            Profile
          </Link>
          
          <Link
            to="/airdrop"
            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
              isActive('/airdrop') 
                ? 'bg-primary-600/20 text-primary-400' 
                : 'text-dark-100 hover:bg-dark-800'
            }`}
          >
            <Gift size={20} className="mr-3" />
            Airdrop
          </Link>
        </nav>
        
        <div className="px-2 space-y-1">
          <Link
            to="/settings"
            className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-dark-100 hover:bg-dark-800 transition-colors"
          >
            <Settings size={20} className="mr-3" />
            Settings
          </Link>
          
          <Link
            to="/help"
            className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-dark-100 hover:bg-dark-800 transition-colors"
          >
            <HelpCircle size={20} className="mr-3" />
            Help Center
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
