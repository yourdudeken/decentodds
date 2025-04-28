import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, User, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { Prediction, Match, usePrediction } from '../../context/PredictionContext';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface PredictionCardProps {
  prediction: Prediction;
}

const PredictionCard = ({ prediction }: PredictionCardProps) => {
  const { getMatchById, purchasePrediction } = usePrediction();
  const match = getMatchById(prediction.matchId);
  
  if (!match) return null;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit'
    }).format(date);
  };
  
  const getResultColor = (result?: 'win' | 'loss' | 'pending') => {
    switch(result) {
      case 'win': return 'text-success-400';
      case 'loss': return 'text-error-400';
      default: return 'text-dark-400';
    }
  };
  
  const getResultIcon = (result?: 'win' | 'loss' | 'pending') => {
    switch(result) {
      case 'win': return <CheckCircle size={16} className="text-success-400" />;
      case 'loss': return <XCircle size={16} className="text-error-400" />;
      default: return <Clock size={16} className="text-dark-400" />;
    }
  };
  
  const handlePurchase = () => {
    purchasePrediction(prediction.id);
  };
  
  return (
    <Card 
      variant="gradient" 
      className="hover:shadow-2xl hover:shadow-primary-500/5 hover:translate-y-[-2px] group"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-dark-700 flex items-center justify-center mr-2 text-sm font-medium overflow-hidden">
              <User size={16} />
            </div>
            <div>
              <p className="text-sm font-medium">{prediction.creatorUsername}</p>
              <p className="text-xs text-dark-400">
                {prediction.creatorAddress.substring(0, 6)}...
                {prediction.creatorAddress.substring(prediction.creatorAddress.length - 4)}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            {getResultIcon(prediction.result)}
            <span className={`text-xs ml-1 ${getResultColor(prediction.result)}`}>
              {prediction.result === 'win' ? 'Won' : prediction.result === 'loss' ? 'Lost' : 'Pending'}
            </span>
          </div>
        </div>
        
        <Link to={`/prediction/${prediction.id}`} className="block">
          <div className="bg-dark-700/50 rounded-lg p-3 mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-dark-400">{match.league}</span>
              <span className="text-xs text-dark-400">{formatDate(match.startTime)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <p className="font-medium truncate">{match.homeTeam}</p>
              </div>
              
              <div className="px-3 text-sm font-semibold">
                VS
              </div>
              
              <div className="flex-1 text-right">
                <p className="font-medium truncate">{match.awayTeam}</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                prediction.prediction === 'home' 
                  ? 'bg-primary-600/20 text-primary-400 border border-primary-600/20' 
                  : 'bg-dark-600/20 text-dark-300'
              }`}>
                {match.homeOdds.toFixed(2)}
              </span>
              
              {match.drawOdds && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  prediction.prediction === 'draw' 
                    ? 'bg-primary-600/20 text-primary-400 border border-primary-600/20' 
                    : 'bg-dark-600/20 text-dark-300'
                }`}>
                  {match.drawOdds.toFixed(2)}
                </span>
              )}
              
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                prediction.prediction === 'away' 
                  ? 'bg-primary-600/20 text-primary-400 border border-primary-600/20' 
                  : 'bg-dark-600/20 text-dark-300'
              }`}>
                {match.awayOdds.toFixed(2)}
              </span>
            </div>
          </div>
        </Link>
        
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <TrendingUp size={16} className="text-dark-400 mr-1" />
            <span className="text-sm font-medium">{prediction.confidence}% Confidence</span>
          </div>
          <div className="text-xs text-dark-400">
            {prediction.purchased} purchases
          </div>
        </div>
        
        <p className="text-sm text-dark-300 line-clamp-2 mb-4">
          {prediction.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-5 w-5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center mr-1 text-xs font-bold">
              D
            </div>
            <span className="font-medium">{prediction.price}</span>
            <span className="ml-1 text-xs text-dark-400">DODDS</span>
          </div>
          
          <div className="flex space-x-2">
            <Link 
              to={`/prediction/${prediction.id}`}
              className="text-primary-400 hover:text-primary-300 transition-colors p-2"
            >
              <ArrowUpRight size={18} />
            </Link>
            
            <Button 
              variant="primary" 
              size="sm"
              onClick={handlePurchase}
            >
              Buy Prediction
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PredictionCard;