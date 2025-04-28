import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  BarChart2,
  Share2
} from 'lucide-react';
import { usePrediction } from '../context/PredictionContext';
import { useWallet } from '../context/WalletContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

const PredictionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPredictionById, getMatchById, purchasePrediction } = usePrediction();
  const { isConnected } = useWallet();
  
  const prediction = getPredictionById(id || '');
  
  if (!prediction) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold mb-2">Prediction Not Found</h2>
        <p className="text-dark-400 mb-4">The prediction you're looking for doesn't exist or has been removed.</p>
        <Button 
          variant="outline" 
          onClick={() => navigate('/marketplace')}
          leftIcon={<ArrowLeft size={18} />}
        >
          Back to Marketplace
        </Button>
      </div>
    );
  }
  
  const match = getMatchById(prediction.matchId);
  
  if (!match) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold mb-2">Match Information Missing</h2>
        <p className="text-dark-400 mb-4">The match details for this prediction are unavailable.</p>
        <Button 
          variant="outline" 
          onClick={() => navigate('/marketplace')}
          leftIcon={<ArrowLeft size={18} />}
        >
          Back to Marketplace
        </Button>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit',
      timeZoneName: 'short'
    }).format(date);
  };
  
  const getTimeDifference = (dateString: string) => {
    const now = new Date();
    const targetDate = new Date(dateString);
    const diffMs = targetDate.getTime() - now.getTime();
    
    // If match has already started
    if (diffMs < 0) {
      return 'Started';
    }
    
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffDays > 0) {
      return `Starts in ${diffDays}d ${diffHours}h`;
    } else if (diffHours > 0) {
      return `Starts in ${diffHours}h ${diffMinutes}m`;
    } else {
      return `Starts in ${diffMinutes}m`;
    }
  };
  
  const getResultStatus = (result?: 'win' | 'loss' | 'pending') => {
    switch(result) {
      case 'win': return { icon: <CheckCircle size={18} />, text: 'Winner', color: 'text-success-400' };
      case 'loss': return { icon: <XCircle size={18} />, text: 'Lost', color: 'text-error-400' };
      default: return { icon: <Clock size={18} />, text: 'Pending', color: 'text-dark-400' };
    }
  };
  
  const resultStatus = getResultStatus(prediction.result);
  
  const handlePurchase = () => {
    purchasePrediction(prediction.id);
  };
  
  return (
    <div>
      <div className="mb-6">
        <Link 
          to="/marketplace"
          className="inline-flex items-center text-dark-300 hover:text-primary-400 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Marketplace
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card variant="gradient" className="overflow-visible">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-dark-700 flex items-center justify-center mr-3 text-sm font-medium overflow-hidden">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="font-semibold">{prediction.creatorUsername}</p>
                    <p className="text-xs text-dark-400">
                      {prediction.creatorAddress.substring(0, 6)}...
                      {prediction.creatorAddress.substring(prediction.creatorAddress.length - 4)}
                    </p>
                  </div>
                </div>
                
                <div className={`flex items-center ${resultStatus.color} px-3 py-1 rounded-full border border-current/20 bg-current/10`}>
                  {resultStatus.icon}
                  <span className="ml-1.5 text-sm font-medium">{resultStatus.text}</span>
                </div>
              </div>
              
              <div className="bg-dark-800/70 rounded-lg p-4 mb-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium">{match.league}</span>
                  <div className="flex items-center text-sm">
                    <Calendar size={16} className="mr-1 text-dark-400" />
                    {formatDate(match.startTime)}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex-1">
                    <p className="text-xl font-semibold">{match.homeTeam}</p>
                  </div>
                  
                  <div className="px-6 text-dark-400 text-lg font-semibold">
                    VS
                  </div>
                  
                  <div className="flex-1 text-right">
                    <p className="text-xl font-semibold">{match.awayTeam}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className={`px-4 py-1.5 rounded-lg text-sm font-medium ${
                    prediction.prediction === 'home' 
                      ? 'bg-primary-600/20 text-primary-400 border border-primary-600/20 ring-2 ring-primary-600/10' 
                      : 'bg-dark-700/50'
                  }`}>
                    <span className="block text-center font-semibold">Home</span>
                    <span className="block text-center mt-1">{match.homeOdds.toFixed(2)}</span>
                  </div>
                  
                  {match.drawOdds && (
                    <div className={`px-4 py-1.5 rounded-lg text-sm font-medium ${
                      prediction.prediction === 'draw' 
                        ? 'bg-primary-600/20 text-primary-400 border border-primary-600/20 ring-2 ring-primary-600/10' 
                        : 'bg-dark-700/50'
                    }`}>
                      <span className="block text-center font-semibold">Draw</span>
                      <span className="block text-center mt-1">{match.drawOdds.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className={`px-4 py-1.5 rounded-lg text-sm font-medium ${
                    prediction.prediction === 'away' 
                      ? 'bg-primary-600/20 text-primary-400 border border-primary-600/20 ring-2 ring-primary-600/10' 
                      : 'bg-dark-700/50'
                  }`}>
                    <span className="block text-center font-semibold">Away</span>
                    <span className="block text-center mt-1">{match.awayOdds.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-dark-700 flex justify-between items-center text-sm">
                  <div className="flex items-center text-dark-400">
                    <Clock size={16} className="mr-1" />
                    {getTimeDifference(match.startTime)}
                  </div>
                  <div className="flex items-center text-dark-400">
                    <TrendingUp size={16} className="mr-1" />
                    {prediction.confidence}% Confidence
                  </div>
                </div>
              </div>
              
              <div className="mb-5">
                <h3 className="text-lg font-semibold mb-2">Prediction Analysis</h3>
                <p className="text-dark-300 whitespace-pre-line">
                  {prediction.description}
                </p>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center mr-2 text-xs font-bold">
                    D
                  </div>
                  <span className="text-xl font-semibold">{prediction.price}</span>
                  <span className="ml-1 text-sm text-dark-400">DODDS</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    leftIcon={<Share2 size={18} />}
                  >
                    Share
                  </Button>
                  
                  {isConnected ? (
                    <Button 
                      variant="primary" 
                      onClick={handlePurchase}
                    >
                      Buy Prediction
                    </Button>
                  ) : (
                    <Button 
                      variant="primary" 
                      disabled
                    >
                      Connect Wallet to Buy
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
          
          <Alert variant="info" title="How predictions work">
            <p className="mb-2">
              When you purchase this prediction, you'll immediately get access to the expert's analysis.
              If the prediction is correct, the creator earns a 20% bonus on the DODDS paid.
            </p>
            <p>
              After the match ends, the result will be automatically verified using our trusted sports data API.
            </p>
          </Alert>
        </div>
        
        <div className="space-y-6">
          <Card variant="gradient" className="p-5">
            <h3 className="font-semibold mb-3 flex items-center">
              <BarChart2 size={18} className="mr-2 text-primary-400" />
              Creator Stats
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-dark-400">Predictions</span>
                <span className="font-medium">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-dark-400">Win Rate</span>
                <span className="font-medium text-success-400">68%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-dark-400">Avg. Confidence</span>
                <span className="font-medium">76%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-dark-400">Total Sold</span>
                <span className="font-medium">149</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-dark-400">Member Since</span>
                <span className="font-medium">Mar 2023</span>
              </div>
            </div>
          </Card>
          
          <Card variant="gradient" className="p-5">
            <h3 className="font-semibold mb-3">Prediction Performance</h3>
            
            <div className="h-4 bg-dark-800 rounded-full overflow-hidden mb-2">
              <div className="flex h-full">
                <div 
                  className="bg-success-500 h-full" 
                  style={{ width: '68%' }} 
                  title="Win: 68%"
                ></div>
                <div 
                  className="bg-error-500 h-full" 
                  style={{ width: '32%' }} 
                  title="Loss: 32%"
                ></div>
              </div>
            </div>
            
            <div className="flex justify-between text-xs mb-4">
              <span className="text-success-400">68% Win</span>
              <span className="text-error-400">32% Loss</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-success-500 mr-1.5"></span>
                  Football
                </span>
                <span className="font-medium">72% Win</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-success-500 mr-1.5"></span>
                  Basketball
                </span>
                <span className="font-medium">65% Win</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-success-500 mr-1.5"></span>
                  Hockey
                </span>
                <span className="font-medium">70% Win</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-error-500 mr-1.5"></span>
                  Baseball
                </span>
                <span className="font-medium">41% Win</span>
              </div>
            </div>
          </Card>
          
          <Card variant="outlined" className="p-5">
            <h3 className="font-semibold mb-3">Match Information</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-dark-400">League</span>
                <span className="font-medium">{match.league}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-400">Sport</span>
                <span className="font-medium capitalize">{match.sport}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-400">Match Time</span>
                <span className="font-medium">
                  {new Date(match.startTime).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-400">Match Date</span>
                <span className="font-medium">
                  {new Date(match.startTime).toLocaleDateString([], { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PredictionDetails;