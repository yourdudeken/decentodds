import React, { useState } from 'react';
import { Plus, Search, SlidersHorizontal } from 'lucide-react';
import { usePrediction } from '../context/PredictionContext';
import { useWallet } from '../context/WalletContext';
import PredictionCard from '../components/marketplace/PredictionCard';
import SportFilter from '../components/marketplace/SportFilter';
import CreatePredictionForm from '../components/marketplace/CreatePredictionForm';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

const Marketplace = () => {
  const { predictions, matches } = usePrediction();
  const { isConnected } = useWallet();
  
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const filteredPredictions = predictions.filter(prediction => {
    const match = matches.find(m => m.id === prediction.matchId);
    
    if (!match) return false;
    
    // Filter by sport
    if (selectedSport && match.sport !== selectedSport) return false;
    
    // Filter by search query
    const searchLower = searchQuery.toLowerCase();
    const matchesQuery = 
      match.homeTeam.toLowerCase().includes(searchLower) ||
      match.awayTeam.toLowerCase().includes(searchLower) ||
      match.league.toLowerCase().includes(searchLower) ||
      prediction.description.toLowerCase().includes(searchLower) ||
      prediction.creatorUsername.toLowerCase().includes(searchLower);
    
    return matchesQuery;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Prediction Marketplace</h1>
          <p className="text-dark-400 mt-1">
            Browse predictions from the community or create your own
          </p>
        </div>
        
        {isConnected ? (
          <Button 
            variant="primary" 
            onClick={() => setShowCreateForm(true)}
            leftIcon={<Plus size={18} />}
          >
            Create Prediction
          </Button>
        ) : (
          <Button 
            variant="outline" 
            disabled
          >
            Connect Wallet to Create
          </Button>
        )}
      </div>
      
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={18} className="text-dark-400" />
          </div>
          <input
            type="text"
            placeholder="Search by team, league, or creator..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-800/50 border border-dark-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        
        <div className="flex items-center">
          <SportFilter 
            selectedSport={selectedSport} 
            onSportSelect={setSelectedSport} 
          />
        </div>
      </div>
      
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-2xl">
            <CreatePredictionForm onClose={() => setShowCreateForm(false)} />
          </div>
        </div>
      )}
      
      {filteredPredictions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPredictions.map(prediction => (
            <PredictionCard key={prediction.id} prediction={prediction} />
          ))}
        </div>
      ) : (
        <Alert variant="info" title="No predictions found">
          {searchQuery || selectedSport ? (
            <p>
              No predictions match your current filters. Try adjusting your search criteria or sport selection.
            </p>
          ) : (
            <p>
              There are no predictions available at the moment. Be the first to create one!
            </p>
          )}
        </Alert>
      )}
    </div>
  );
};

export default Marketplace;