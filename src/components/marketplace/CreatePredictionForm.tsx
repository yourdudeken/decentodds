import React, { useState, FormEvent } from 'react';
import { usePrediction, Match } from '../../context/PredictionContext';
import { useWallet } from '../../context/WalletContext';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Alert from '../ui/Alert';

interface CreatePredictionFormProps {
  onClose: () => void;
}

const CreatePredictionForm = ({ onClose }: CreatePredictionFormProps) => {
  const { matches, createPrediction } = usePrediction();
  const { address } = useWallet();
  
  const [formData, setFormData] = useState({
    matchId: '',
    prediction: '',
    confidence: 70,
    price: 25,
    description: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.matchId) newErrors.matchId = 'Please select a match';
    if (!formData.prediction) newErrors.prediction = 'Please select a prediction';
    if (formData.confidence < 50 || formData.confidence > 100) {
      newErrors.confidence = 'Confidence must be between 50 and 100';
    }
    if (formData.price < 5 || formData.price > 100) {
      newErrors.price = 'Price must be between 5 and 100 DODDS';
    }
    if (!formData.description) {
      newErrors.description = 'Please provide a description';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      createPrediction({
        matchId: formData.matchId,
        creatorAddress: address || '',
        creatorUsername: 'You', // In a real app, this would come from the user's profile
        prediction: formData.prediction as 'home' | 'away' | 'draw',
        confidence: formData.confidence,
        price: formData.price,
        description: formData.description,
        result: 'pending',
      });
      
      setSuccessMessage('Your prediction has been created successfully!');
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          matchId: '',
          prediction: '',
          confidence: 70,
          price: 25,
          description: '',
        });
        setSuccessMessage('');
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error creating prediction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const getSelectedMatch = (): Match | undefined => {
    return matches.find(m => m.id === formData.matchId);
  };
  
  const selectedMatch = getSelectedMatch();
  
  return (
    <Card variant="gradient" className="w-full max-w-lg mx-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Create New Prediction</h2>
        
        {successMessage && (
          <Alert variant="success" className="mb-4">
            {successMessage}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="matchId" className="block text-sm font-medium text-dark-300 mb-1">
              Select Match
            </label>
            <select
              id="matchId"
              name="matchId"
              value={formData.matchId}
              onChange={handleChange}
              className={`w-full bg-dark-700 border ${
                errors.matchId ? 'border-error-500' : 'border-dark-600'
              } rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500`}
            >
              <option value="">Select a match...</option>
              {matches.map(match => (
                <option key={match.id} value={match.id}>
                  {match.homeTeam} vs {match.awayTeam} - {match.league}
                </option>
              ))}
            </select>
            {errors.matchId && (
              <p className="mt-1 text-xs text-error-400">{errors.matchId}</p>
            )}
          </div>
          
          {selectedMatch && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-dark-300 mb-1">
                Your Prediction
              </label>
              <div className="flex space-x-3">
                <label className={`flex-1 border ${
                  formData.prediction === 'home' 
                    ? 'border-primary-500 bg-primary-500/10' 
                    : 'border-dark-600 bg-dark-700'
                  } rounded-lg p-3 cursor-pointer transition-colors`}
                >
                  <input
                    type="radio"
                    name="prediction"
                    value="home"
                    checked={formData.prediction === 'home'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <p className="text-sm font-medium">{selectedMatch.homeTeam}</p>
                    <p className="text-xs mt-1 text-dark-400">
                      Odds: {selectedMatch.homeOdds.toFixed(2)}
                    </p>
                  </div>
                </label>
                
                {selectedMatch.drawOdds && (
                  <label className={`flex-1 border ${
                    formData.prediction === 'draw' 
                      ? 'border-primary-500 bg-primary-500/10' 
                      : 'border-dark-600 bg-dark-700'
                    } rounded-lg p-3 cursor-pointer transition-colors`}
                  >
                    <input
                      type="radio"
                      name="prediction"
                      value="draw"
                      checked={formData.prediction === 'draw'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <p className="text-sm font-medium">Draw</p>
                      <p className="text-xs mt-1 text-dark-400">
                        Odds: {selectedMatch.drawOdds.toFixed(2)}
                      </p>
                    </div>
                  </label>
                )}
                
                <label className={`flex-1 border ${
                  formData.prediction === 'away' 
                    ? 'border-primary-500 bg-primary-500/10' 
                    : 'border-dark-600 bg-dark-700'
                  } rounded-lg p-3 cursor-pointer transition-colors`}
                >
                  <input
                    type="radio"
                    name="prediction"
                    value="away"
                    checked={formData.prediction === 'away'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <p className="text-sm font-medium">{selectedMatch.awayTeam}</p>
                    <p className="text-xs mt-1 text-dark-400">
                      Odds: {selectedMatch.awayOdds.toFixed(2)}
                    </p>
                  </div>
                </label>
              </div>
              {errors.prediction && (
                <p className="mt-1 text-xs text-error-400">{errors.prediction}</p>
              )}
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="confidence" className="block text-sm font-medium text-dark-300 mb-1">
                Confidence (%)
              </label>
              <input
                type="number"
                id="confidence"
                name="confidence"
                min="50"
                max="100"
                value={formData.confidence}
                onChange={handleChange}
                className={`w-full bg-dark-700 border ${
                  errors.confidence ? 'border-error-500' : 'border-dark-600'
                } rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
              {errors.confidence && (
                <p className="mt-1 text-xs text-error-400">{errors.confidence}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-dark-300 mb-1">
                Price (DODDS)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                min="5"
                max="100"
                value={formData.price}
                onChange={handleChange}
                className={`w-full bg-dark-700 border ${
                  errors.price ? 'border-error-500' : 'border-dark-600'
                } rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
              {errors.price && (
                <p className="mt-1 text-xs text-error-400">{errors.price}</p>
              )}
            </div>
          </div>
          
          <div className="mb-5">
            <label htmlFor="description" className="block text-sm font-medium text-dark-300 mb-1">
              Prediction Analysis
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Explain why your prediction will come true..."
              className={`w-full bg-dark-700 border ${
                errors.description ? 'border-error-500' : 'border-dark-600'
              } rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500`}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-error-400">{errors.description}</p>
            )}
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button 
              type="button" 
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary"
              isLoading={isSubmitting}
            >
              Create Prediction
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default CreatePredictionForm;