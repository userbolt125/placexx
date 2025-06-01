import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Globe, Search, MapPin, Activity, Calendar } from 'lucide-react';
import Sidebar from './components/Sidebar';
import PlacesSidebar from './components/PlacesSidebar';
import HomePage from './pages/HomePage';
import HealthPage from './pages/HealthPage';
import ChefchaouenPage from './pages/ChefchaouenPage';
import { ExplorationMode } from './types';

function App() {
  const [mode, setMode] = useState<ExplorationMode>('place');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPlacesSidebarOpen, setIsPlacesSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'health', label: 'Health' },
    { value: 'education', label: 'Education' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'sports', label: 'Sports' },
    { value: 'culture', label: 'Culture' },
    { value: 'business', label: 'Business' }
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="h-16 flex items-center justify-between gap-8">
              {/* Left section */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 rounded-md hover:bg-slate-50 transition-colors"
                >
                  <Search size={22} className="text-slate-700" />
                </button>
              </div>

              {/* Center section */}
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">Place</span>
                <span className="text-2xl font-bold text-slate-800">2</span>
              </Link>

              {/* Right section */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setIsPlacesSidebarOpen(true)}
                  className="p-2 rounded-md hover:bg-slate-50 transition-colors"
                >
                  <Globe size={22} className="text-slate-700" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar - Now sticky */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
          <div className="container mx-auto px-4 flex justify-center space-x-4 py-3">
            <button 
              className={`flex items-center px-6 py-2 rounded-md transition-colors ${
                mode === 'place' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              onClick={() => setMode('place')}
            >
              <MapPin size={20} className="mr-2" />
              <span>Explore Places</span>
            </button>
            <button 
              className={`flex items-center px-6 py-2 rounded-md transition-colors ${
                mode === 'activity' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              onClick={() => setMode('activity')}
            >
              <Activity size={20} className="mr-2" />
              <span>Find Activities</span>
            </button>
            <button 
              className={`flex items-center px-6 py-2 rounded-md transition-colors ${
                mode === 'event' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              onClick={() => setMode('event')}
            >
              <Calendar size={20} className="mr-2" />
              <span>Browse Events</span>
            </button>
          </div>
          
          {/* Search Area */}
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-40 px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder={`Search in ${selectedCategory === 'all' ? 'all categories' : selectedCategory}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />

        <PlacesSidebar
          isOpen={isPlacesSidebarOpen}
          onClose={() => setIsPlacesSidebarOpen(false)}
        />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage mode={mode} />} />
            <Route path="/health" element={<HealthPage />} />
            <Route path="/africa/morocco/chefchaouen" element={<ChefchaouenPage />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-slate-200 py-4 px-6">
          <div className="container mx-auto flex items-center justify-between text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Globe size={18} />
              <span>Place2 © 2025</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-blue-600 transition-colors">About</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;