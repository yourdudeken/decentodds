import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, CheckCircle, AlertCircle, ChevronRight, Lock, Unlock } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Airdrop = () => {
  const { isConnected, address } = useWallet();
  const [claimedAmount, setClaimedAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  
  const tasks = [
    {
      id: 'connect',
      title: 'Connect Wallet',
      description: 'Connect your wallet to get started',
      reward: 25,
      isCompleted: isConnected,
      isLocked: false,
    },
    {
      id: 'twitter',
      title: 'Follow on Twitter',
      description: 'Follow @decentodds on Twitter',
      reward: 50,
      isCompleted: completedTasks.includes('twitter'),
      isLocked: !isConnected,
    },
    {
      id: 'telegram',
      title: 'Join Telegram Group',
      description: 'Join our community on Telegram',
      reward: 50,
      isCompleted: completedTasks.includes('telegram'),
      isLocked: !isConnected,
    },
    {
      id: 'prediction',
      title: 'Create a Prediction',
      description: 'Post your first prediction on the platform',
      reward: 100,
      isCompleted: completedTasks.includes('prediction'),
      isLocked: !isConnected,
    },
    {
      id: 'purchase',
      title: 'Purchase a Prediction',
      description: 'Buy your first prediction from another user',
      reward: 75,
      isCompleted: completedTasks.includes('purchase'),
      isLocked: !isConnected,
    },
  ];
  
  const totalRewards = tasks.reduce((acc, task) => {
    if (task.isCompleted) {
      return acc + task.reward;
    }
    return acc;
  }, 0);
  
  const handleCompleteTask = async (taskId: string) => {
    if (!isConnected) return;
    if (completedTasks.includes(taskId)) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setCompletedTasks(prev => [...prev, taskId]);
    setClaimedAmount(prev => prev + tasks.find(t => t.id === taskId)?.reward || 0);
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">DODDS Token Airdrop</h1>
        <p className="text-dark-300">
          Complete tasks to claim free DODDS tokens! Each task you complete will add tokens to your wallet.
          These tokens can be used to buy predictions on the platform or stake for additional rewards.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card variant="gradient" className="p-6 sticky top-24">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary-600/20 flex items-center justify-center mx-auto mb-4">
                <Gift size={24} className="text-primary-400" />
              </div>
              <h2 className="text-xl font-bold mb-2">Your Airdrop</h2>
              <div className="flex items-center justify-center mb-4">
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center mr-2 text-xs font-bold">
                  D
                </div>
                <span className="text-3xl font-bold">{claimedAmount}</span>
                <span className="ml-2 text-dark-400">DODDS</span>
              </div>
              
              <div className="w-full bg-dark-800 rounded-full h-3 mb-2">
                <div 
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((totalRewards / 300) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-dark-400 mb-6">
                {totalRewards} / 300 DODDS claimed
              </p>
              
              {!isConnected ? (
                <Button 
                  variant="primary" 
                  className="w-full"
                >
                  Connect Wallet to Claim
                </Button>
              ) : (
                <Button 
                  variant="primary" 
                  className="w-full"
                  disabled={totalRewards === 0}
                >
                  Claim Tokens
                </Button>
              )}
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Complete Tasks to Earn</h2>
            
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card
                  variant={task.isCompleted ? 'default' : 'outlined'}
                  className={`p-5 transition-all ${
                    task.isCompleted 
                      ? 'bg-gradient-to-r from-primary-600/20 to-success-500/20 border border-success-500/20' 
                      : task.isLocked
                        ? 'opacity-70'
                        : 'hover:border-primary-500/30'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                      task.isCompleted 
                        ? 'bg-success-500/20 text-success-400'
                        : task.isLocked 
                          ? 'bg-dark-700 text-dark-500'
                          : 'bg-primary-600/20 text-primary-400'
                    }`}>
                      {task.isCompleted ? (
                        <CheckCircle size={20} />
                      ) : task.isLocked ? (
                        <Lock size={20} />
                      ) : (
                        <Gift size={20} />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold flex items-center">
                        {task.title}
                        {task.isCompleted && (
                          <span className="ml-2 text-xs text-success-400 bg-success-500/10 px-2 py-0.5 rounded-full">
                            Completed
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-dark-400 mt-1">{task.description}</p>
                    </div>
                    
                    <div className="ml-4 flex items-center">
                      <div className="flex items-center mr-4">
                        <div className="h-5 w-5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center mr-1 text-xs font-bold">
                          D
                        </div>
                        <span className="font-semibold">{task.reward}</span>
                      </div>
                      
                      {!task.isCompleted && (
                        <Button
                          variant={task.isLocked ? 'ghost' : 'outline'}
                          size="sm"
                          disabled={task.isLocked || isLoading}
                          isLoading={isLoading && completedTasks.includes(task.id)}
                          onClick={() => handleCompleteTask(task.id)}
                          rightIcon={<ChevronRight size={16} />}
                        >
                          {task.isLocked ? 'Locked' : 'Complete'}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
            
            <Card variant="gradient" className="p-5 mt-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-accent-400/20 flex items-center justify-center mr-4">
                  <AlertCircle size={20} className="text-accent-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Important Information</h3>
                  <p className="text-sm text-dark-300 mt-2">
                    The DODDS token airdrop is available for a limited time. Tokens claimed during this period will be sent to your connected wallet address. Make sure to complete all tasks to maximize your rewards.
                  </p>
                  <p className="text-sm text-dark-300 mt-2">
                    Once you've earned tokens, you can use them immediately on the platform to buy predictions or hold them for future use.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Airdrop;