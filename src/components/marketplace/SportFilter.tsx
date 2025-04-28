import React from 'react';
import { FolderRoot as Football, Dumbbell, Dribbble, Disc } from 'lucide-react';

interface SportFilterProps {
  selectedSport: string | null;
  onSportSelect: (sport: string | null) => void;
}

const SportFilter = ({ selectedSport, onSportSelect }: SportFilterProps) => {
  const sports = [
    { id: null, name: 'All', icon: <Dumbbell size={20} /> },
    { id: 'football', name: 'Football', icon: <Football size={20} /> },
    { id: 'basketball', name: 'Basketball', icon: <Dribbble size={20} /> },
    { id: 'baseball', name: 'Baseball', icon: <Disc size={20} /> },
    { id: 'hockey', name: 'Hockey', icon: <Disc size={20} /> },
  ];

  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
      {sports.map((sport) => (
        <button
          key={sport.id || 'all'}
          onClick={() => onSportSelect(sport.id)}
          className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selectedSport === sport.id
              ? 'bg-primary-600 text-white'
              : 'bg-dark-800 hover:bg-dark-700 text-dark-300'
          }`}
        >
          <span className="mr-1.5">{sport.icon}</span>
          {sport.name}
        </button>
      ))}
    </div>
  );
};

export default SportFilter;