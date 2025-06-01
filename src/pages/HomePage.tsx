import React from 'react';
import { ExplorationMode } from '../types';
import { samplePlaces, sampleActivities, sampleEvents } from '../data/samples';

interface HomePageProps {
  mode: ExplorationMode;
}

const HomePage: React.FC<HomePageProps> = ({ mode }) => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        {mode === 'place' ? 'Featured Places' : mode === 'activity' ? 'Featured Activities' : 'Events'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mode === 'place' && (
          // Places Grid
          samplePlaces.map(place => (
            <div key={place.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <img 
                  src={place.media?.images[0]}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-semibold text-lg">{place.name}</h3>
                  <p className="text-white/90 text-sm">
                    {place.location.city}, {place.location.country}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-slate-600 text-sm mb-3">
                  {place.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {place.categories.map((category, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}

        {mode === 'activity' && (
          // Activities Grid
          sampleActivities.map(activity => (
            <div key={activity.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <img 
                  src={activity.media?.images[0]}
                  alt={activity.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-semibold text-lg">{activity.name}</h3>
                  <p className="text-white/90 text-sm">
                    {activity.classification.level1}
                    {activity.classification.level2 && ` > ${activity.classification.level2}`}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-slate-600 text-sm mb-3">
                  {activity.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {activity.context.map((ctx, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2 py-1 rounded-full bg-teal-100 text-teal-800"
                    >
                      {ctx}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-slate-500">
                  <p>Duration: {activity.duration?.min}-{activity.duration?.max} {activity.duration?.unit}</p>
                  <p>Frequency: {activity.frequency}</p>
                </div>
              </div>
            </div>
          ))
        )}

        {mode === 'event' && (
          // Events Grid
          sampleEvents.map(event => (
            <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <img 
                  src={event.media?.images[0]}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-semibold text-lg">{event.name}</h3>
                  <p className="text-white/90 text-sm">
                    {event.location.venue}, {event.location.city}
                  </p>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className={`text-sm font-medium ${
                    event.status === 'upcoming' ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    {event.status === 'upcoming' ? 'Upcoming' : 'Available'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-slate-600 text-sm mb-3">
                  {event.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {event.category.map((cat, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-slate-500 space-y-1">
                  <p>Date: {formatDate(event.date)} at {event.time}</p>
                  <p>Price: {formatCurrency(event.price?.amount || 0, event.price?.currency || 'USD')}</p>
                  <p>Available Tickets: {event.capacity?.available} / {event.capacity?.total}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;