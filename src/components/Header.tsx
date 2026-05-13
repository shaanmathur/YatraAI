import { MapPin, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onNavigate: (page: 'home' | 'planner') => void;
  currentPage: string;
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="bg-white/90 backdrop-blur-md border-b border-amber-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                Yatra<span className="text-orange-500">AI</span>
              </span>
            </button>

            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => onNavigate('home')}
                className={`text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
              >
                Home
              </button>
              <button
                onClick={() => onNavigate('planner')}
                className={`text-sm font-medium transition-colors ${currentPage === 'planner' ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
              >
                Plan a Trip
              </button>
              <a href="#popular" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">
                Destinations
              </a>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => onNavigate('planner')}
                className="px-5 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Start Planning
              </button>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-orange-50"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-amber-100 bg-white px-4 py-4 space-y-3">
            <button onClick={() => { onNavigate('home'); setMenuOpen(false); }} className="block w-full text-left text-sm font-medium text-gray-700 py-2">Home</button>
            <button onClick={() => { onNavigate('planner'); setMenuOpen(false); }} className="block w-full text-left text-sm font-medium text-gray-700 py-2">Plan a Trip</button>
            <button onClick={() => { onNavigate('planner'); setMenuOpen(false); }} className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-sm font-semibold rounded-full">
              Start Planning
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
