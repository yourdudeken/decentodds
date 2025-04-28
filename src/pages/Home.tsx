import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, BarChart, LineChart } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { useWallet } from '../context/WalletContext';

const Home = () => {
  const { isConnected } = useWallet();
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto">
        <motion.div 
          className="space-y-6"
          initial="hidden"
          animate="show"
          variants={staggerChildren}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 bg-clip-text text-transparent"
            variants={fadeInUp}
          >
            Predict Smart. Earn Fair. <br className="hidden md:block" />
            Decentralized Forever.
          </motion.h1>
          
          <motion.p 
            className="text-lg text-dark-300 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            DecentOdds is a decentralized Web3 platform where users can buy and sell 
            sports betting predictions using DODDS tokens. Smart contracts ensure 
            transparency and fairness.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            variants={fadeInUp}
          >
            {isConnected ? (
              <Link to="/marketplace">
                <Button 
                  variant="primary" 
                  size="lg" 
                  rightIcon={<ArrowRight size={18} />}
                >
                  Explore Predictions
                </Button>
              </Link>
            ) : (
              <Button 
                variant="primary" 
                size="lg" 
                rightIcon={<Zap size={18} />}
              >
                Connect Wallet
              </Button>
            )}
            
            <Link to="/airdrop">
              <Button 
                variant="outline" 
                size="lg"
              >
                Claim Airdrop
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">How DecentOdds Works</h2>
          <p className="text-dark-300 max-w-2xl mx-auto">
            Our platform combines the power of blockchain technology with sports predictions, 
            creating a transparent and rewarding ecosystem for sports enthusiasts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl p-6 h-full">
              <div className="w-12 h-12 rounded-lg bg-primary-600/20 flex items-center justify-center mb-4">
                <BarChart size={24} className="text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Buy & Sell Predictions</h3>
              <p className="text-dark-300">
                Access expert predictions for upcoming sports matches or share your own insights
                and get rewarded when you're right.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl p-6 h-full">
              <div className="w-12 h-12 rounded-lg bg-secondary-500/20 flex items-center justify-center mb-4">
                <Shield size={24} className="text-secondary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Contract Rewards</h3>
              <p className="text-dark-300">
                Our blockchain-based system automatically rewards accurate predictions and 
                ensures complete transparency in all transactions.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl p-6 h-full">
              <div className="w-12 h-12 rounded-lg bg-accent-400/20 flex items-center justify-center mb-4">
                <LineChart size={24} className="text-accent-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Odds</h3>
              <p className="text-dark-300">
                Our platform syncs with trusted sports odds APIs to provide real-time data and
                determine prediction outcomes accurately.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Token Info */}
      <section className="bg-gradient-to-r from-primary-600/20 to-secondary-500/20 rounded-2xl p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">DODDS Token</h2>
            <p className="text-dark-300 mb-6">
              The native cryptocurrency of the DecentOdds platform powers all transactions,
              rewards, and governance. DODDS tokens are used to buy predictions, earn rewards 
              for accurate analysis, and participate in platform governance.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-dark-800/70 flex items-center justify-center mr-3">
                  <span className="font-semibold">1</span>
                </div>
                <p>Buy and sell predictions using DODDS tokens</p>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-dark-800/70 flex items-center justify-center mr-3">
                  <span className="font-semibold">2</span>
                </div>
                <p>Earn rewards when your predictions are correct</p>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-dark-800/70 flex items-center justify-center mr-3">
                  <span className="font-semibold">3</span>
                </div>
                <p>Stake DODDS to increase your earnings and influence</p>
              </div>
            </div>
            
            <div className="mt-8">
              <Link to="/airdrop">
                <Button 
                  variant="primary"
                  size="lg"
                >
                  Get DODDS Tokens
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-dark-900/60 backdrop-blur-md rounded-xl p-6 border border-dark-700">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-dark-400 text-sm">Total Supply</p>
                <p className="text-2xl font-bold mt-1">100,000,000</p>
                <p className="text-primary-400 text-sm">DODDS</p>
              </div>
              
              <div className="text-center">
                <p className="text-dark-400 text-sm">Initial Price</p>
                <p className="text-2xl font-bold mt-1">$0.05</p>
                <p className="text-primary-400 text-sm">USD</p>
              </div>
              
              <div className="text-center">
                <p className="text-dark-400 text-sm">Airdrop Allocation</p>
                <p className="text-2xl font-bold mt-1">15%</p>
                <p className="text-primary-400 text-sm">15,000,000 DODDS</p>
              </div>
              
              <div className="text-center">
                <p className="text-dark-400 text-sm">Platform Rewards</p>
                <p className="text-2xl font-bold mt-1">40%</p>
                <p className="text-primary-400 text-sm">40,000,000 DODDS</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-dark-700">
              <h4 className="font-semibold mb-3">Token Distribution</h4>
              <div className="h-6 bg-dark-800 rounded-full overflow-hidden">
                <div className="flex h-full">
                  <div className="bg-primary-500 h-full w-[40%]" title="Platform Rewards: 40%"></div>
                  <div className="bg-secondary-500 h-full w-[25%]" title="Team & Advisors: 25%"></div>
                  <div className="bg-accent-400 h-full w-[15%]" title="Airdrop: 15%"></div>
                  <div className="bg-success-500 h-full w-[10%]" title="Liquidity: 10%"></div>
                  <div className="bg-error-500 h-full w-[10%]" title="Treasury: 10%"></div>
                </div>
              </div>
              <div className="flex flex-wrap mt-3 text-xs">
                <div className="flex items-center mr-4 mb-2">
                  <div className="h-3 w-3 rounded-full bg-primary-500 mr-1"></div>
                  <span>Platform Rewards (40%)</span>
                </div>
                <div className="flex items-center mr-4 mb-2">
                  <div className="h-3 w-3 rounded-full bg-secondary-500 mr-1"></div>
                  <span>Team & Advisors (25%)</span>
                </div>
                <div className="flex items-center mr-4 mb-2">
                  <div className="h-3 w-3 rounded-full bg-accent-400 mr-1"></div>
                  <span>Airdrop (15%)</span>
                </div>
                <div className="flex items-center mr-4 mb-2">
                  <div className="h-3 w-3 rounded-full bg-success-500 mr-1"></div>
                  <span>Liquidity (10%)</span>
                </div>
                <div className="flex items-center mb-2">
                  <div className="h-3 w-3 rounded-full bg-error-500 mr-1"></div>
                  <span>Treasury (10%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-8">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-dark-300 max-w-2xl mx-auto mb-8">
          Join the DecentOdds community today and start earning rewards for your sports knowledge.
          Connect your wallet, claim your airdrop, and begin your journey in decentralized predictions.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {isConnected ? (
            <Link to="/marketplace">
              <Button 
                variant="primary" 
                size="lg" 
              >
                Explore Marketplace
              </Button>
            </Link>
          ) : (
            <Button 
              variant="primary" 
              size="lg" 
            >
              Connect Wallet
            </Button>
          )}
          
          <Link to="/airdrop">
            <Button 
              variant="outline" 
              size="lg"
            >
              Claim Airdrop
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;