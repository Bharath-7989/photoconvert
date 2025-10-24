
import React from 'react';
import { HEADSHOT_STYLES } from '../constants';
import { HeadshotStyle } from '../types';

interface StyleSelectorProps {
  selectedStyleId: string | null;
  onSelectStyle: (style: HeadshotStyle) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyleId, onSelectStyle }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">2. Select a Style</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {HEADSHOT_STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onSelectStyle(style)}
            className={`relative rounded-lg overflow-hidden border-2 transition-all duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-brand-primary/50 ${
              selectedStyleId === style.id ? 'border-brand-primary scale-105' : 'border-base-300 hover:border-brand-light'
            }`}
          >
            <img src={style.previewUrl} alt={style.name} className="w-full h-32 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-2">
              <p className="text-white text-sm font-semibold text-center w-full">{style.name}</p>
            </div>
            {selectedStyleId === style.id && (
              <div className="absolute top-2 right-2 bg-brand-primary rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
