import React from 'react';
import { useWallet } from '../../context/WalletContext';
import CountUp from 'react-countup';

const TokenDisplay = () => {
  const { balance } = useWallet();

  return (
    <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 px-3 py-1.5 rounded-lg flex items-center">
      <div className="h-5 w-5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center mr-2 text-xs font-bold">
        D
      </div>
      <div>
        <CountUp
          end={balance}
          decimals={2}
          duration={1}
          separator=","
          className="font-medium"
        />
        <span className="ml-1 text-xs text-dark-400">DODDS</span>
      </div>
    </div>
  );
};

export default TokenDisplay;