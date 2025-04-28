import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  startTime: string;
  homeOdds: number;
  drawOdds: number | null;
  awayOdds: number;
  sport: 'football' | 'basketball' | 'baseball' | 'hockey';
}

export interface Prediction {
  id: string;
  matchId: string;
  creatorAddress: string;
  creatorUsername: string;
  prediction: 'home' | 'away' | 'draw';
  confidence: number;
  price: number;
  description: string;
  createdAt: string;
  purchased: number;
  result?: 'win' | 'loss' | 'pending';
}

interface PredictionContextType {
  matches: Match[];
  predictions: Prediction[];
  userPredictions: Prediction[];
  purchasedPredictions: Prediction[];
  createPrediction: (prediction: Omit<Prediction, 'id' | 'createdAt' | 'purchased'>) => void;
  purchasePrediction: (id: string) => void;
  getPredictionById: (id: string) => Prediction | undefined;
  getMatchById: (id: string) => Match | undefined;
}

const PredictionContext = createContext<PredictionContextType>({
  matches: [],
  predictions: [],
  userPredictions: [],
  purchasedPredictions: [],
  createPrediction: () => {},
  purchasePrediction: () => {},
  getPredictionById: () => undefined,
  getMatchById: () => undefined,
});

export const usePrediction = () => useContext(PredictionContext);

// Mock data
const mockMatches: Match[] = [
  {
    id: 'm1',
    homeTeam: 'Los Angeles Lakers',
    awayTeam: 'Brooklyn Nets',
    league: 'NBA',
    startTime: new Date(Date.now() + 3600000 * 24).toISOString(),
    homeOdds: 1.85,
    drawOdds: null,
    awayOdds: 2.05,
    sport: 'basketball',
  },
  {
    id: 'm2',
    homeTeam: 'Manchester United',
    awayTeam: 'Chelsea',
    league: 'Premier League',
    startTime: new Date(Date.now() + 3600000 * 48).toISOString(),
    homeOdds: 2.25,
    drawOdds: 3.40,
    awayOdds: 3.10,
    sport: 'football',
  },
  {
    id: 'm3',
    homeTeam: 'New York Yankees',
    awayTeam: 'Boston Red Sox',
    league: 'MLB',
    startTime: new Date(Date.now() + 3600000 * 12).toISOString(),
    homeOdds: 1.95,
    drawOdds: null,
    awayOdds: 1.90,
    sport: 'baseball',
  },
  {
    id: 'm4',
    homeTeam: 'Vegas Golden Knights',
    awayTeam: 'Colorado Avalanche',
    league: 'NHL',
    startTime: new Date(Date.now() + 3600000 * 36).toISOString(),
    homeOdds: 2.10,
    drawOdds: null,
    awayOdds: 1.80,
    sport: 'hockey',
  },
  {
    id: 'm5',
    homeTeam: 'Arsenal',
    awayTeam: 'Liverpool',
    league: 'Premier League',
    startTime: new Date(Date.now() + 3600000 * 72).toISOString(),
    homeOdds: 2.40,
    drawOdds: 3.25,
    awayOdds: 2.90,
    sport: 'football',
  },
];

const mockPredictions: Prediction[] = [
  {
    id: 'p1',
    matchId: 'm1',
    creatorAddress: '0x1234567890abcdef1234567890abcdef12345678',
    creatorUsername: 'HoopsMaster',
    prediction: 'home',
    confidence: 85,
    price: 25,
    description: 'Lakers have won their last 5 home games and have a fully fit squad. Expect them to dominate.',
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    purchased: 12,
    result: 'pending',
  },
  {
    id: 'p2',
    matchId: 'm2',
    creatorAddress: '0x2345678901abcdef2345678901abcdef23456789',
    creatorUsername: 'FootballGuru',
    prediction: 'draw',
    confidence: 70,
    price: 30,
    description: 'Both teams are in good form but tend to cancel each other out in big matches.',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    purchased: 8,
    result: 'pending',
  },
  {
    id: 'p3',
    matchId: 'm3',
    creatorAddress: '0x3456789012abcdef3456789012abcdef34567890',
    creatorUsername: 'BaseballPro',
    prediction: 'away',
    confidence: 90,
    price: 40,
    description: 'Red Sox have an excellent record against Yankees in recent encounters. Their pitcher is in great form.',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    purchased: 20,
    result: 'pending',
  },
  {
    id: 'p4',
    matchId: 'm4',
    creatorAddress: '0x4567890123abcdef4567890123abcdef45678901',
    creatorUsername: 'IceExpert',
    prediction: 'away',
    confidence: 75,
    price: 35,
    description: 'Avalanche have been dominating on the road this season. Expect them to continue their form.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    purchased: 15,
    result: 'pending',
  },
  {
    id: 'p5',
    matchId: 'm5',
    creatorAddress: '0x5678901234abcdef5678901234abcdef56789012',
    creatorUsername: 'PremierPundit',
    prediction: 'home',
    confidence: 65,
    price: 20,
    description: 'Arsenal have a strong record at home against Liverpool in recent seasons.',
    createdAt: new Date(Date.now() - 3600000 * 30).toISOString(),
    purchased: 10,
    result: 'pending',
  },
];

interface PredictionProviderProps {
  children: ReactNode;
}

export const PredictionProvider = ({ children }: PredictionProviderProps) => {
  const [matches] = useState<Match[]>(mockMatches);
  const [predictions, setPredictions] = useState<Prediction[]>(mockPredictions);
  const [userPredictions, setUserPredictions] = useState<Prediction[]>([]);
  const [purchasedPredictions, setPurchasedPredictions] = useState<Prediction[]>([]);

  const createPrediction = useCallback((newPrediction: Omit<Prediction, 'id' | 'createdAt' | 'purchased'>) => {
    const prediction: Prediction = {
      ...newPrediction,
      id: `p${predictions.length + 1}`,
      createdAt: new Date().toISOString(),
      purchased: 0,
    };
    
    setPredictions(prev => [...prev, prediction]);
    setUserPredictions(prev => [...prev, prediction]);
  }, [predictions]);

  const purchasePrediction = useCallback((id: string) => {
    const prediction = predictions.find(p => p.id === id);
    if (prediction) {
      setPredictions(prev => 
        prev.map(p => p.id === id ? { ...p, purchased: p.purchased + 1 } : p)
      );
      setPurchasedPredictions(prev => [...prev, prediction]);
    }
  }, [predictions]);

  const getPredictionById = useCallback(
    (id: string) => predictions.find(p => p.id === id),
    [predictions]
  );

  const getMatchById = useCallback(
    (id: string) => matches.find(m => m.id === id),
    [matches]
  );

  return (
    <PredictionContext.Provider
      value={{
        matches,
        predictions,
        userPredictions,
        purchasedPredictions,
        createPrediction,
        purchasePrediction,
        getPredictionById,
        getMatchById,
      }}
    >
      {children}
    </PredictionContext.Provider>
  );
};