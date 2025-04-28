import React from 'react';
import { Link } from 'react-router-dom';
import { GithubIcon, TwitterIcon, Globe } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer = () => {
  return (
    <footer className="bg-dark-900/80 backdrop-blur-sm border-t border-dark-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <Logo size={28} />
              <span className="ml-2 font-display text-lg font-bold">DecentOdds</span>
            </Link>
            <p className="mt-3 text-sm text-dark-300">
              Predict Smart. Earn Fair. <br />
              Decentralized Forever.
            </p>
            <div className="mt-4 flex space-x-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-primary-400 transition-colors"
              >
                <TwitterIcon size={18} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-primary-400 transition-colors"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-primary-400 transition-colors"
              >
                <Globe size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase text-dark-300">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-dark-300 hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/marketplace" className="text-dark-300 hover:text-primary-400 transition-colors">Marketplace</Link></li>
              <li><Link to="/profile" className="text-dark-300 hover:text-primary-400 transition-colors">Profile</Link></li>
              <li><Link to="/airdrop" className="text-dark-300 hover:text-primary-400 transition-colors">Airdrop</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase text-dark-300">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-dark-300 hover:text-primary-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-dark-300 hover:text-primary-400 transition-colors">Tokenomics</a></li>
              <li><a href="#" className="text-dark-300 hover:text-primary-400 transition-colors">Roadmap</a></li>
              <li><a href="#" className="text-dark-300 hover:text-primary-400 transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase text-dark-300">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-dark-300 hover:text-primary-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-dark-300 hover:text-primary-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-dark-300 hover:text-primary-400 transition-colors">Disclaimer</a></li>
              <li><a href="#" className="text-dark-300 hover:text-primary-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-dark-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-dark-400">
            &copy; {new Date().getFullYear()} DecentOdds. All rights reserved.
          </p>
          <p className="text-xs text-dark-400 mt-2 md:mt-0">
            DecentOdds is not a gambling platform. It is a decentralized prediction marketplace for informational and entertainment purposes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;