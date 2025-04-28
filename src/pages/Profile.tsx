import React from 'react';
import { useWallet } from '../context/WalletContext';
import StatisticsCard from '../components/profile/StatisticsCard';
import PredictionHistory from '../components/profile/PredictionHistory';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Profile = () => {
  const { isConnected, address, balance } = useWallet();
  
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="mb-6 w-16 h-16 rounded-full bg-dark-800 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-dark-400">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Profile Not Available</h2>
        <p className="text-dark-400 max-w-md mb-6">
          Connect your wallet to access your profile, view your prediction history, and track your earnings.
        </p>
        <Button variant="primary">
          Connect Wallet
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-dark-400 mt-1">Manage your predictions and track your performance</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card variant="gradient" className="p-6">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-dark-800 border-4 border-primary-600 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">
                  {address ? address.substring(2, 4).toUpperCase() : 'U'}
                </span>
              </div>
              
              <div className="text-center mb-6">
                <p className="font-semibold text-lg">User</p>
                <p className="text-dark-400 text-sm mt-1">
                  {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
                </p>
              </div>
              
              <div className="w-full bg-dark-800/50 rounded-lg p-4 flex items-center justify-between mb-4">
                <span className="text-dark-400">DODDS Balance</span>
                <div className="flex items-center">
                  <div className="h-5 w-5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center mr-2 text-xs font-bold">
                    D
                  </div>
                  <span className="font-semibold">{balance.toFixed(2)}</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <StatisticsCard />
          
          <div>
            <h2 className="text-xl font-bold mb-4">Prediction History</h2>
            <PredictionHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;