import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Menu, X, Search, User, Bell, ChevronDown, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const TipCard = ({ matches = [], odds = 0, price = 0, rating = 0 }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="pt-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
            <span className="text-xs text-white">s</span>
          </div>
          <span className="text-sm text-gray-600">sokafans</span>
          <span className="text-sm text-gray-600 ml-auto">Nov 25, 2024</span>
        </div>
        
        <div className="flex mb-4">
          {[1, 2, 3, 4, 4.5].map((val, idx) => (
            <Star 
              key={idx}
              className={`w-4 h-4 ${val <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
          ))}
        </div>

        <div className="space-y-3 mb-6">
          {matches.map((match, idx) => (
            <div key={idx} className="text-sm text-gray-800 pb-2 border-b border-gray-100">
              {match}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-blue-500">ODDS</span>
          <span className="text-sm font-semibold">{odds}</span>
        </div>

        <button className="w-full bg-blue-500 text-white py-2 rounded-md mb-3">
          BUY @KSH. {price}
        </button>

        <button className="w-full text-blue-500 text-sm">
          Buy from other countries
        </button>
      </CardContent>
    </Card>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const menuItems = ['Home', 'Live Scores', 'Predictions', 'Statistics', 'News'];
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-sm">Download App</span>
            <span className="text-sm">Contact Us</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-sm">Login</button>
            <button className="bg-white text-blue-600 px-4 py-1 rounded-md text-sm">Register</button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-blue-600">SokaFans</h1>
            
            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-6">
              {menuItems.map((item) => (
                <button 
                  key={item}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => console.log(`Clicked ${item}`)}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center">
              <input
                type="search"
                placeholder="Search..."
                className="px-4 py-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <button className="bg-blue-600 text-white p-2 rounded-r-md">
                <Search className="w-5 h-5" />
              </button>
            </div>
            
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="relative">
              <button 
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <User className="w-5 h-5 text-gray-600" />
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Profile
                  </button>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Settings
                  </button>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            {menuItems.map((item) => (
              <button
                key={item}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
                onClick={() => {
                  console.log(`Clicked ${item}`);
                  setIsMenuOpen(false);
                }}
              >
                {item}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About SokaFans</h3>
            <p className="text-gray-400 text-sm">
              Your trusted source for football predictions, live scores, and statistics. Join our community of passionate football fans.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Today\'s Tips', 'Live Scores', 'Statistics', 'News', 'VIP Tips'].map((item) => (
                <li key={item}>
                  <button className="text-gray-400 hover:text-white text-sm">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {['FAQ', 'Contact Us', 'Terms of Service', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <button className="text-gray-400 hover:text-white text-sm">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get daily tips and updates
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-600 flex-1"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                <button 
                  key={idx}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 SokaFans. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const BettingTipsPlatform = () => {
  // Define the tips data within the component
  const tips = [
    {
      matches: [
        'Slavia Sofia vs Levski Krumovgrad',
        'Al-Rayyan SC vs Persepolis FC',
        'Kisvarda FC vs Budapest Honved',
        'Atromitos vs Levadiakos'
      ],
      odds: 95.82,
      price: 120,
      rating: 4.5
    },
    {
      matches: [
        'Dordrecht vs FC OSS',
        'Vendsyssel FF vs Odense',
        'Emmen vs De Graafschap',
        'Miedz Legnica vs Wisla Plock'
      ],
      odds: 69.65,
      price: 100,
      rating: 4.5
    },
    {
      matches: [
        'Al-Gharafa vs Al-Nassr',
        'Trabzonspor vs Adana Demirspor',
        'FC Midtjyland vs Silkeborg'
      ],
      odds: 46.54,
      price: 80,
      rating: 4.5
    },
    {
      matches: [
        'Newcastle vs West Ham',
        'Dinamo Minsk vs Bate Borisov',
        'AEK Larnaca vs Karmiotissa'
      ],
      odds: 34.78,
      price: 60,
      rating: 4.5
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-4">Active Tips</h1>
          <div className="text-sm text-gray-600 mb-6">View Tips</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip, idx) => (
              <TipCard key={idx} {...tip} />
            ))}
          </div>

          <button className="mt-8 text-blue-500 mx-auto block">
            SEE MORE
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BettingTipsPlatform;