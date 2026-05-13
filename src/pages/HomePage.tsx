import { ArrowRight, Sparkles, MapPin, Clock, Star, ChevronRight } from 'lucide-react';
import { popularCities } from '../data/cities';

interface HomePageProps {
  onNavigate: (page: 'home' | 'planner', city?: string) => void;
}

const features = [
  {
    icon: '🤖',
    title: 'AI-Powered Planning',
    description: 'Our advanced AI crafts a personalized day-by-day itinerary tailored to your interests, budget, and travel style.',
  },
  {
    icon: '🚆',
    title: 'Transport Comparison',
    description: 'Compare flights, trains, buses, and road trips with real pricing and travel time estimates.',
  },
  {
    icon: '🏨',
    title: 'Hotel Recommendations',
    description: 'Curated hotel suggestions across all budgets — from heritage havelis to modern boutique stays.',
  },
  {
    icon: '🍛',
    title: 'Food & Cafe Guide',
    description: 'Discover the best local dhabas, rooftop cafes, fine dining, and street food you simply cannot miss.',
  },
  {
    icon: '📸',
    title: 'Must-Visit Highlights',
    description: 'Every city\'s iconic landmarks, hidden gems, and Instagram-worthy spots included in every plan.',
  },
  {
    icon: '💰',
    title: 'Budget Planner',
    description: 'Accurate budget breakdowns for your entire trip — from transport to accommodation to food.',
  },
];

const testimonials = [
  { name: 'Priya S.', city: 'Bengaluru', text: 'YatraAI planned our Rajasthan trip perfectly. Every restaurant and hotel suggestion was spot on!', rating: 5 },
  { name: 'Arjun M.', city: 'Delhi', text: 'Saved hours of research. The transport comparison helped us save ₹3000 on our Goa trip.', rating: 5 },
  { name: 'Sneha K.', city: 'Mumbai', text: 'The itinerary for Varanasi was incredibly detailed. Felt like having a local guide!', rating: 5 },
];

const indiaColors = [
  'from-orange-500 to-amber-400',
  'from-rose-500 to-pink-400',
  'from-emerald-600 to-teal-500',
  'from-sky-500 to-blue-600',
  'from-amber-500 to-yellow-400',
  'from-red-600 to-rose-500',
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950 via-orange-900 to-rose-900" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Decorative mandala-inspired SVG overlay */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-amber-400/20" />
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-amber-400/15" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full border border-rose-400/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5" />

          {/* Decorative dots pattern */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-amber-400/40"
              style={{
                top: `${10 + (i * 17) % 80}%`,
                left: `${5 + (i * 23) % 90}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-sm font-medium mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            AI-Powered Trip Planning for India
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            Discover the
            <span className="block bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
              Soul of India
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-amber-100/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            From the snow-capped Himalayas to the sun-kissed beaches of Kerala — let our AI plan your perfect Indian journey, day by day, experience by experience.
          </p>

          {/* Quick City Search */}
          <div className="max-w-lg mx-auto">
            <div className="flex gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2">
              <div className="flex items-center gap-2 flex-1 px-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Where in India?"
                  className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-sm"
                  onFocus={() => onNavigate('planner')}
                />
              </div>
              <button
                onClick={() => onNavigate('planner')}
                className="px-5 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold rounded-xl text-sm hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                Plan Trip <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-12 flex-wrap">
            {[
              { value: '500+', label: 'Cities Covered' },
              { value: '10K+', label: 'Trips Planned' },
              { value: '4.9★', label: 'Avg Rating' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-amber-300/70 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-xs">
          <span>Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* Rangoli color band - India's flag inspired */}
      <div className="h-2 bg-gradient-to-r from-orange-500 via-white to-green-600" />

      {/* Features */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need, <span className="text-orange-500">All in One Place</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              YatraAI does the heavy lifting so you can focus on experiencing India's incredible diversity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${indiaColors[i]} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section id="popular" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Popular <span className="text-orange-500">Destinations</span>
              </h2>
              <p className="text-gray-500 text-sm">Explore India's most-loved cities</p>
            </div>
            <button
              onClick={() => onNavigate('planner')}
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
            >
              View all <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularCities.slice(0, 8).map((city) => (
              <button
                key={city.name}
                onClick={() => onNavigate('planner', city.name)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <img
                  src={city.image}
                  alt={city.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                  <div className="text-white font-bold text-sm">{city.name}</div>
                  <div className="text-white/70 text-xs mt-0.5">{city.state}</div>
                  <div
                    className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs text-white font-medium"
                    style={{ backgroundColor: city.color + 'CC' }}
                  >
                    {city.tagline}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Regional diversity strip */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { region: 'North India', desc: 'Mughal Splendour, Mountains & Spirituality', color: 'from-orange-500 to-amber-500', icon: '🏔️' },
              { region: 'South India', desc: 'Ancient Temples, Beaches & Backwaters', color: 'from-emerald-600 to-teal-500', icon: '🌴' },
              { region: 'East India', desc: 'Wildlife, Hill Stations & Art', color: 'from-sky-500 to-blue-600', icon: '🐯' },
              { region: 'West India', desc: 'Deserts, Forts, Beaches & Festivals', color: 'from-rose-500 to-pink-500', icon: '🏰' },
            ].map(r => (
              <div
                key={r.region}
                className={`bg-gradient-to-br ${r.color} rounded-2xl p-5 text-white hover:scale-[1.02] transition-transform cursor-pointer`}
                onClick={() => onNavigate('planner')}
              >
                <div className="text-3xl mb-2">{r.icon}</div>
                <div className="font-bold text-sm">{r.region}</div>
                <div className="text-white/75 text-xs mt-1 leading-relaxed">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-amber-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-orange-500 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-rose-500 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How <span className="text-amber-400">YatraAI</span> Works
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">Plan your entire India trip in under 2 minutes</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Tell Us Your Dream', desc: 'Choose your destination, trip duration, travel style, budget, and what interests you most.', icon: '✍️' },
              { step: '02', title: 'AI Builds Your Plan', desc: 'Our AI crafts a detailed day-by-day itinerary with curated restaurants, hotels, and experiences.', icon: '🤖' },
              { step: '03', title: 'Travel & Explore', desc: 'Get your full plan with transport options, must-visits, local food tips, and a complete budget breakdown.', icon: '🗺️' },
            ].map((item, i) => (
              <div key={item.step} className="relative">
                {i < 2 && (
                  <div className="hidden sm:block absolute top-8 left-full w-full h-px border-t-2 border-dashed border-amber-700/50 -translate-x-4" />
                )}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-3xl mb-4">
                    {item.icon}
                  </div>
                  <div className="text-amber-500 font-mono text-xs font-bold mb-2">STEP {item.step}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Loved by <span className="text-rose-500">Travellers</span> Across India
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-rose-400 flex items-center justify-center text-white text-sm font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-rose-500">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Your Next Adventure Awaits
          </h2>
          <p className="text-orange-100 mb-8 text-lg">
            Start planning your dream India trip today. Completely free, powered by AI.
          </p>
          <button
            onClick={() => onNavigate('planner')}
            className="px-8 py-4 bg-white text-orange-600 font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
          >
            <Clock className="w-5 h-5" />
            Plan My Trip in 2 Minutes
          </button>
        </div>
      </section>
    </div>
  );
}
