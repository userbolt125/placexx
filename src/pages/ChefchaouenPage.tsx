import React, { useState } from 'react';
import { ExplorationMode } from '../types';
import { samplePlaces, sampleActivities, sampleEvents } from '../data/samples';

const images = [
  'https://images.pexels.com/photos/4388167/pexels-photo-4388167.jpeg',
  'https://images.pexels.com/photos/4388164/pexels-photo-4388164.jpeg',
  'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg',
  'https://images.pexels.com/photos/4371206/pexels-photo-4371206.jpeg'
];

const ChefchaouenPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedMode, setSelectedMode] = useState<ExplorationMode | null>(null);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const overview = `
    Chefchaouen, known as the "Blue Pearl of Morocco", is a stunning city nestled in the Rif Mountains. 
    Famous for its striking blue-painted buildings, this enchanting destination offers visitors a unique 
    blend of Moroccan and Andalusian culture. The city's distinctive color scheme, dating back to the 
    15th century, creates an otherworldly atmosphere that captivates photographers and travelers alike.
  `;

  const renderContent = () => {
    if (!selectedMode) {
      return (
        <div className="space-y-6">
          <div className="relative h-[500px] group">
            <img 
              src={images[currentImageIndex]} 
              alt="Chefchaouen"
              className="w-full h-full object-cover rounded-lg"
            />
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ←
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              →
            </button>
          </div>
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Overview</h2>
            <p className="text-slate-600 leading-relaxed">{overview}</p>
          </div>
        </div>
      );
    }

    const filteredContent = {
      place: samplePlaces.filter(p => p.location.city === 'Chefchaouen'),
      activity: sampleActivities.filter(a => a.compatiblePlaces.includes('Medina')),
      event: sampleEvents.filter(e => e.location.city === 'Chefchaouen')
    };

    const content = filteredContent[selectedMode];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map((item: any) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-48">
              <img 
                src={item.media.images[0]} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-semibold text-lg">{item.name}</h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-slate-600 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 p-4">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Chefchaouen Guide</h2>
        <nav className="space-y-2">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-slate-500 px-3">Advice</h3>
            <a href="#" className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md">
              Best Time to Visit
            </a>
            <a href="#" className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md">
              Travel Tips
            </a>
            <a href="#" className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md">
              Local Customs
            </a>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-slate-500 px-3">Community</h3>
            <a href="#" className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md">
              Travel Stories
            </a>
            <a href="#" className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md">
              Local Insights
            </a>
            <a href="#" className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md">
              Q&A
            </a>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-6 flex gap-4">
          <button 
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedMode === 'place' 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            onClick={() => setSelectedMode(selectedMode === 'place' ? null : 'place')}
          >
            Explore Places
          </button>
          <button 
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedMode === 'activity' 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            onClick={() => setSelectedMode(selectedMode === 'activity' ? null : 'activity')}
          >
            Find Activities
          </button>
          <button 
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedMode === 'event' 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            onClick={() => setSelectedMode(selectedMode === 'event' ? null : 'event')}
          >
            Browse Events
          </button>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default ChefchaouenPage;