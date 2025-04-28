import React from 'react';
import { usePrediction } from '../../context/PredictionContext';
import { CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';
import Card from '../ui/Card';

const PredictionHistory = () => {
  const { userPredictions, purchasedPredictions, getMatchById } = usePrediction();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric'
    }).format(date);
  };
  
  const getStatusIcon = (result?: 'win' | 'loss' | 'pending') => {
    switch(result) {
      case 'win': return <CheckCircle size={16} className="text-success-400" />;
      case 'loss': return <XCircle size={16} className="text-error-400" />;
      default: return <Clock size={16} className="text-dark-400" />;
    }
  };
  
  const getStatusText = (result?: 'win' | 'loss' | 'pending') => {
    switch(result) {
      case 'win': return 'Won';
      case 'loss': return 'Lost';
      default: return 'Pending';
    }
  };
  
  const getStatusClass = (result?: 'win' | 'loss' | 'pending') => {
    switch(result) {
      case 'win': return 'text-success-400';
      case 'loss': return 'text-error-400';
      default: return 'text-dark-400';
    }
  };
  
  if (userPredictions.length === 0 && purchasedPredictions.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-dark-400">
          You haven't created or purchased any predictions yet.
        </p>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      {userPredictions.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3">Your Predictions</h3>
          <div className="space-y-3">
            {userPredictions.map(prediction => {
              const match = getMatchById(prediction.matchId);
              if (!match) return null;
              
              return (
                <Card 
                  key={prediction.id} 
                  variant="outlined"
                  className="p-4"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{match.homeTeam} vs {match.awayTeam}</p>
                      <p className="text-xs text-dark-400 mt-1">{match.league} • Created on {formatDate(prediction.createdAt)}</p>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(prediction.result)}
                      <span className={`ml-1 text-sm ${getStatusClass(prediction.result)}`}>
                        {getStatusText(prediction.result)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-3 text-sm">
                    <div className={`px-2 py-0.5 rounded-full text-xs ${
                      prediction.prediction === 'home' 
                        ? 'bg-primary-600/20 text-primary-400 border border-primary-600/20' 
                        : prediction.prediction === 'away'
                          ? 'bg-secondary-500/20 text-secondary-400 border border-secondary-500/20'
                          : 'bg-accent-400/20 text-accent-300 border border-accent-400/20'
                    }`}>
                      {prediction.prediction === 'home' 
                        ? match.homeTeam 
                        : prediction.prediction === 'away' 
                          ? match.awayTeam 
                          : 'Draw'}
                    </div>
                    
                    <div className="flex items-center ml-3">
                      <TrendingUp size={14} className="text-dark-400 mr-1" />
                      <span>{prediction.confidence}% Confidence</span>
                    </div>
                    
                    <div className="ml-auto flex items-center">
                      <div className="h-4 w-4 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center mr-1 text-xs font-bold">
                        D
                      </div>
                      <span>{prediction.price}</span>
                      <span className="ml-1 text-xs text-dark-400">• {prediction.purchased} sales</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
      
      {purchasedPredictions.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3">Purchased Predictions</h3>
          <div className="space-y-3">
            {purchasedPredictions.map(prediction => {
              const match = getMatchById(prediction.matchId);
              if (!match) return null;
              
              return (
                <Card 
                  key={prediction.id} 
                  variant="outlined"
                  className="p-4"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{match.homeTeam} vs {match.awayTeam}</p>
                      <p className="text-xs text-dark-400 mt-1">
                        {match.league} • By {prediction.creatorUsername}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(prediction.result)}
                      <span className={`ml-1 text-sm ${getStatusClass(prediction.result)}`}>
                        {getStatusText(prediction.result)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-3 text-sm">
                    <div className={`px-2 py-0.5 rounded-full text-xs ${
                      prediction.prediction === 'home' 
                        ? 'bg-primary-600/20 text-primary-400 border border-primary-600/20' 
                        : prediction.prediction === 'away'
                          ? 'bg-secondary-500/20 text-secondary-400 border border-secondary-500/20'
                          : 'bg-accent-400/20 text-accent-300 border border-accent-400/20'
                    }`}>
                      {prediction.prediction === 'home' 
                        ? match.homeTeam 
                        : prediction.prediction === 'away' 
                          ? match.awayTeam 
                          : 'Draw'}
                    </div>
                    
                    <div className="flex items-center ml-3">
                      <TrendingUp size={14} className="text-dark-400 mr-1" />
                      <span>{prediction.confidence}% Confidence</span>
                    </div>
                    
                    <div className="ml-auto flex items-center">
                      <div className="h-4 w-4 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center mr-1 text-xs font-bold">
                        D
                      </div>
                      <span>{prediction.price}</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionHistory;