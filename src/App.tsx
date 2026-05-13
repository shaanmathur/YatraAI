import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PlannerPage from './pages/PlannerPage';
import ItineraryPage from './pages/ItineraryPage';
import { supabase } from './lib/supabase';
import type { TripFormData, ItineraryData } from './types';

type Page = 'home' | 'planner' | 'itinerary';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [initialCity, setInitialCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryData | null>(null);
  const [formData, setFormData] = useState<TripFormData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = (target: 'home' | 'planner', city?: string) => {
    setPage(target);
    if (city) setInitialCity(city);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerate = async (data: TripFormData) => {
    setLoading(true);
    setError(null);
    setFormData(data);

    try {
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
      const response = await fetch('https://eijjmsvqprscmeawhwda.supabase.co/functions/v1/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'apikey': supabaseAnonKey,

        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || 'Failed to generate itinerary');
      }

      const generatedItinerary: ItineraryData = {
  ...result,
  dayPlans: result.itinerary?.map((day: any) => ({
    day: day.day,
    title: day.theme,
    morning: day.activities?.filter((_: any, i: number) => i % 3 === 0) || [],
    afternoon: day.activities?.filter((_: any, i: number) => i % 3 === 1) || [],
    evening: day.activities?.filter((_: any, i: number) => i % 3 === 2) || [],
    tips: 'Enjoy your day!',
  })) || [],
};
      setItinerary(generatedItinerary);

      // Save to Supabase in background
      supabase.from('itineraries').insert({
        city: data.city,
        days: data.days,
        traveler_type: data.travelerType,
        budget: data.budget,
        interests: data.interests,
        itinerary_data: generatedItinerary,
      }).then(({ error: dbErr }) => {
        if (dbErr) console.warn('Failed to save itinerary:', dbErr.message);
      });

      setPage('itinerary');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onNavigate={(p) => navigate(p)}
        currentPage={page}
      />

      <main className="flex-1">
        {page === 'home' && (
          <HomePage onNavigate={navigate} />
        )}

        {page === 'planner' && (
          <>
            {error && (
              <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4">
                <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 rounded-xl shadow-lg flex items-start gap-2">
                  <span className="shrink-0">⚠️</span>
                  <div>
                    <div className="font-semibold">Generation failed</div>
                    <div className="mt-0.5 opacity-80">{error}</div>
                  </div>
                  <button onClick={() => setError(null)} className="ml-auto shrink-0 text-rose-400 hover:text-rose-600">✕</button>
                </div>
              </div>
            )}
            <PlannerPage
              initialCity={initialCity}
              onGenerate={handleGenerate}
              loading={loading}
            />
          </>
        )}

        {page === 'itinerary' && itinerary && formData && (
          <ItineraryPage
            data={itinerary}
            formData={formData}
            onBack={() => setPage('planner')}
            onNewPlan={() => { setPage('planner'); setInitialCity(''); window.scrollTo({ top: 0 }); }}
          />
        )}
      </main>

      {page !== 'itinerary' && <Footer />}
    </div>
  );
}
