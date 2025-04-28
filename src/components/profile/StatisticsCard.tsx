import React from 'react';
import { usePrediction } from '../../context/PredictionContext';
import { PieChart as ChartPie, TrendingUp, Users, DollarSign } from 'lucide-react';
import Card from '../ui/Card';
import CountUp from 'react-countup';

const StatisticsCard = () => {
  const { userPredictions } = usePrediction();
  
  const totalPredictions = userPredictions.length;
  const winningPredictions = userPredictions.filter(p => p.result === 'win').length;
  const pendingPredictions = userPredictions.filter(p => p.result === 'pending').length;
  const totalSales = userPredictions.reduce((acc, p) => acc + p.purchased, 0);
  const totalEarned = userPredictions.reduce((acc, p) => {
    if (p.result === 'win') {
      return acc + (p.price * p.purchased * 0.2); // 20% profit
    }
    return acc;
  }, 0);
  
  const winRate = totalPredictions > 0 
    ? (winningPredictions / (totalPredictions - pendingPredictions)) * 100 
    : 0;
  
  const stats = [
    {
      title: 'Total Predictions',
      value: totalPredictions,
      icon: <ChartPie size={18} className="text-primary-400" />,
      suffix: '',
    },
    {
      title: 'Win Rate',
      value: winRate,
      icon: <TrendingUp size={18} className="text-success-400" />,
      suffix: '%',
    },
    {
      title: 'Total Sales',
      value: totalSales,
      icon: <Users size={18} className="text-secondary-400" />,
      suffix: '',
    },
    {
      title: 'Earned DODDS',
      value: totalEarned.toFixed(2),
      icon: <DollarSign size={18} className="text-accent-400" />,
      suffix: 'DODDS',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} variant="gradient" className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-dark-400">{stat.title}</p>
              <div className="flex items-end mt-1">
                <p className="text-2xl font-semibold">
                  <CountUp end={parseFloat(stat.value.toString())} decimals={stat.title === 'Win Rate' || stat.title === 'Earned DODDS' ? 2 : 0} duration={2} />
                </p>
                {stat.suffix && <p className="text-sm text-dark-400 ml-1">{stat.suffix}</p>}
              </div>
            </div>
            <div className="p-2 rounded-full bg-dark-700">
              {stat.icon}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatisticsCard;