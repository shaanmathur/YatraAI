import { MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Yatra<span className="text-orange-400">AI</span></span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your AI-powered travel companion for exploring the incredible diversity of India. From the Himalayas to Kerala backwaters, plan your perfect Indian adventure.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Popular Destinations</h4>
            <ul className="space-y-2 text-sm">
              {['Jaipur', 'Goa', 'Varanasi', 'Kerala', 'Ladakh', 'Agra'].map(city => (
                <li key={city}>
                  <span className="text-gray-400 hover:text-orange-400 transition-colors cursor-pointer">{city}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Travel Regions</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'North India', desc: 'Himalayas, Plains & Heritage' },
                { label: 'South India', desc: 'Temples, Backwaters & Spices' },
                { label: 'East India', desc: 'Hills, Forests & Culture' },
                { label: 'West India', desc: 'Deserts, Beaches & Forts' },
              ].map(r => (
                <li key={r.label}>
                  <span className="text-gray-300 font-medium">{r.label}</span>
                  <span className="text-gray-500 ml-2 text-xs">{r.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2026 YatraAI — Crafted with <Heart className="inline w-3 h-3 text-rose-500 mx-1" /> for India
          </p>
          <p className="text-xs text-gray-600">
            Powered by Artificial Intelligence · Covering 500+ destinations across India
          </p>
        </div>
      </div>
    </footer>
  );
}
