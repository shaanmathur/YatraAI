import { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar, Users, Wallet, Sparkles, ChevronDown, X } from 'lucide-react';
import { allCities, interests } from '../data/cities';
import type { TripFormData } from '../types';

interface PlannerPageProps {
  initialCity?: string;
  onGenerate: (data: TripFormData) => void;
  loading: boolean;
}

const travelerTypes = [
  { id: 'solo', label: 'Solo', icon: '🧍', desc: 'Independent exploration' },
  { id: 'couple', label: 'Couple', icon: '👫', desc: 'Romantic getaway' },
  { id: 'family', label: 'Family', icon: '👨‍👩‍👧', desc: 'Fun for everyone' },
  { id: 'group', label: 'Group', icon: '👥', desc: 'Friends adventure' },
];

const budgetLevels = [
  { id: 'budget', label: 'Budget', icon: '💚', desc: '₹1,000–2,500/day', color: 'border-emerald-500 bg-emerald-50' },
  { id: 'mid', label: 'Mid-Range', icon: '💛', desc: '₹2,500–6,000/day', color: 'border-amber-500 bg-amber-50' },
  { id: 'luxury', label: 'Luxury', icon: '❤️', desc: '₹6,000+/day', color: 'border-rose-500 bg-rose-50' },
];

export default function PlannerPage({ initialCity = '', onGenerate, loading }: PlannerPageProps) {
  const [form, setForm] = useState<TripFormData>({
    city: initialCity,
    days: 3,
    travelerType: 'solo',
    budget: 'mid',
    interests: [],
  });

  const [citySearch, setCitySearch] = useState(initialCity);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialCity) {
      setForm(f => ({ ...f, city: initialCity }));
      setCitySearch(initialCity);
    }
  }, [initialCity]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleCityInput = (val: string) => {
    setCitySearch(val);
    setForm(f => ({ ...f, city: val }));
    if (val.length > 0) {
      setFilteredCities(allCities.filter(c => c.toLowerCase().includes(val.toLowerCase())).slice(0, 8));
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const selectCity = (city: string) => {
    setCitySearch(city);
    setForm(f => ({ ...f, city }));
    setShowDropdown(false);
  };

  const toggleInterest = (id: string) => {
    setForm(f => ({
      ...f,
      interests: f.interests.includes(id)
        ? f.interests.filter(i => i !== id)
        : [...f.interests, id],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.city.trim()) return;
    onGenerate(form);
  };

  const isValid = form.city.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 pt-24 pb-16">
      {/* Decorative elements */}
      <div className="fixed top-0 right-0 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-72 h-72 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI Trip Planner
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Plan Your Perfect
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">
              India Adventure
            </span>
          </h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Tell us your preferences and our AI will craft a personalized itinerary in seconds.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-amber-100 overflow-hidden">
          {/* Progress bar */}
          <div className="h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-rose-500" />

          <div className="p-6 sm:p-8 space-y-8">
            {/* City */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-3">
                <MapPin className="w-4 h-4 text-orange-500" />
                Where do you want to go?
              </label>
              <div className="relative" ref={dropdownRef}>
                <input
                  type="text"
                  value={citySearch}
                  onChange={e => handleCityInput(e.target.value)}
                  onFocus={() => citySearch && setShowDropdown(true)}
                  placeholder="e.g. Jaipur, Goa, Varanasi..."
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none text-gray-900 placeholder-gray-400 text-sm transition-colors"
                />
                {citySearch && (
                  <button
                    type="button"
                    onClick={() => { setCitySearch(''); setForm(f => ({ ...f, city: '' })); setShowDropdown(false); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                {showDropdown && filteredCities.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                    {filteredCities.map(city => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => selectCity(city)}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center gap-2"
                      >
                        <MapPin className="w-3 h-3 text-orange-400" />
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Days */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-3">
                <Calendar className="w-4 h-4 text-orange-500" />
                How many days?
                <span className="ml-auto text-orange-500 font-bold text-lg">{form.days} {form.days === 1 ? 'day' : 'days'}</span>
              </label>
              <input
                type="range"
                min={1}
                max={14}
                value={form.days}
                onChange={e => setForm(f => ({ ...f, days: Number(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1 day</span>
                <span>7 days</span>
                <span>14 days</span>
              </div>
            </div>

            {/* Traveler Type */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-3">
                <Users className="w-4 h-4 text-orange-500" />
                Who's travelling?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {travelerTypes.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, travelerType: t.id as TripFormData['travelerType'] }))}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      form.travelerType === t.id
                        ? 'border-orange-400 bg-orange-50 shadow-sm'
                        : 'border-gray-200 hover:border-orange-200'
                    }`}
                  >
                    <div className="text-2xl mb-1">{t.icon}</div>
                    <div className="text-xs font-semibold text-gray-800">{t.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-3">
                <Wallet className="w-4 h-4 text-orange-500" />
                What's your budget style?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {budgetLevels.map(b => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, budget: b.id as TripFormData['budget'] }))}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      form.budget === b.id
                        ? `${b.color} shadow-sm`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-xl mb-1">{b.icon}</div>
                    <div className="text-xs font-bold text-gray-800">{b.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{b.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-1">
                <span className="text-orange-500">✨</span>
                What are you interested in?
                <span className="text-xs font-normal text-gray-400 ml-1">(pick any)</span>
              </label>
              <div className="flex flex-wrap gap-2 mt-3">
                {interests.map(interest => (
                  <button
                    key={interest.id}
                    type="button"
                    onClick={() => toggleInterest(interest.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                      form.interests.includes(interest.id)
                        ? 'border-orange-400 bg-orange-500 text-white shadow-sm'
                        : 'border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-500'
                    }`}
                  >
                    {interest.icon} {interest.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isValid || loading}
              className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-200 ${
                isValid && !loading
                  ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white hover:shadow-xl hover:scale-[1.02] cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Crafting Your Itinerary...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate My Itinerary
                  <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
                </>
              )}
            </button>

            {!isValid && (
              <p className="text-center text-xs text-gray-400 -mt-4">Please enter a destination city to continue</p>
            )}
          </div>
        </form>

        {/* Trust signals */}
        <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
          {['✓ Free to use', '✓ No sign-up needed', '✓ AI-powered plans', '✓ Updated recommendations'].map(t => (
            <span key={t} className="text-xs text-gray-500">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
