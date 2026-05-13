import { useState } from 'react';
import { MapPin, Calendar, Clock, Star, Plane, Brain as Train, Bus, Car, Hotel, Coffee, Utensils, Camera, ChevronDown, ChevronUp, ArrowLeft, Bookmark, Share2, IndianRupee, Info, CheckCircle, Sun, Sunset, Moon } from 'lucide-react';
import type { ItineraryData, TripFormData } from '../types';

interface ItineraryPageProps {
  data: ItineraryData;
  formData: TripFormData;
  onBack: () => void;
  onNewPlan: () => void;
}

const transportIcons = {
  flight: Plane,
  train: Train,
  bus: Bus,
  car: Car,
};

const transportColors = {
  flight: 'from-sky-500 to-blue-600',
  train: 'from-emerald-500 to-teal-600',
  bus: 'from-amber-500 to-orange-500',
  car: 'from-rose-500 to-pink-600',
};

const activityTypeColors: Record<string, string> = {
  attraction: 'bg-sky-100 text-sky-700',
  restaurant: 'bg-rose-100 text-rose-700',
  cafe: 'bg-amber-100 text-amber-700',
  hotel: 'bg-violet-100 text-violet-700',
  activity: 'bg-emerald-100 text-emerald-700',
};

const activityIcons = {
  attraction: Camera,
  restaurant: Utensils,
  cafe: Coffee,
  hotel: Hotel,
  activity: Star,
};

const easeColors = {
  Easy: 'text-emerald-600 bg-emerald-50',
  Moderate: 'text-amber-600 bg-amber-50',
  Challenging: 'text-rose-600 bg-rose-50',
};

export default function ItineraryPage({ data, formData, onBack, onNewPlan }: ItineraryPageProps) {
  const [activeDay, setActiveDay] = useState(0);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'transport' | 'hotels' | 'tips'>('itinerary');
  const [expandedActivities, setExpandedActivities] = useState<Record<string, boolean>>({});

  const toggleActivity = (key: string) => {
    setExpandedActivities(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const day = data.dayPlans[activeDay];

  const timeSlots = [
    { key: 'morning', label: 'Morning', icon: Sun, color: 'text-amber-500', activities: day?.morning || [] },
    { key: 'afternoon', label: 'Afternoon', icon: Sunset, color: 'text-orange-500', activities: day?.afternoon || [] },
    { key: 'evening', label: 'Evening', icon: Moon, color: 'text-indigo-500', activities: day?.evening || [] },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* City Hero Banner */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900 to-orange-800" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <div className="flex items-start justify-between">
            <div>
              <button
                onClick={onBack}
                className="flex items-center gap-1 text-white/70 hover:text-white text-sm mb-3 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Planner
              </button>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{data.city}</h1>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className="flex items-center gap-1 text-amber-300 text-sm">
                  <Calendar className="w-4 h-4" /> {data.days} {data.days === 1 ? 'day' : 'days'}
                </span>
                <span className="flex items-center gap-1 text-amber-300 text-sm">
                  <MapPin className="w-4 h-4" /> {data.language}
                </span>
                <span className="flex items-center gap-1 text-amber-300 text-sm">
                  <Clock className="w-4 h-4" /> Best: {data.bestTimeToVisit}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors">
                <Bookmark className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* City Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2">
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5 mb-6">
          <p className="text-gray-600 text-sm leading-relaxed">{data.cityOverview}</p>

          {/* Must Visit Tags */}
          {data.mustVisit?.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-500" /> MUST-VISIT HIGHLIGHTS
              </div>
              <div className="flex flex-wrap gap-2">
                {data.mustVisit.map(item => (
                  <span key={item} className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs rounded-full font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Budget Summary */}
          {data.estimatedBudget && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-xs font-semibold text-gray-500 mb-3 flex items-center gap-1">
                <IndianRupee className="w-3 h-3" /> ESTIMATED DAILY BUDGET (PER PERSON)
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'budget', label: 'Budget', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
                  { key: 'mid', label: 'Mid-Range', color: 'bg-amber-50 border-amber-200 text-amber-700' },
                  { key: 'luxury', label: 'Luxury', color: 'bg-rose-50 border-rose-200 text-rose-700' },
                ].map(b => (
                  <div key={b.key} className={`rounded-xl border p-3 text-center ${b.color} ${formData.budget === b.key ? 'ring-2 ring-offset-1 ring-current' : ''}`}>
                    <div className="text-xs font-medium opacity-70">{b.label}</div>
                    <div className="text-sm font-bold mt-0.5">{data.estimatedBudget[b.key as keyof typeof data.estimatedBudget]}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 bg-white rounded-xl border border-gray-200 p-1 mb-6 overflow-x-auto">
          {[
            { id: 'itinerary', label: 'Day-by-Day', icon: '📅' },
            { id: 'transport', label: 'Getting There', icon: '🚆' },
            { id: 'hotels', label: 'Hotels', icon: '🏨' },
            { id: 'tips', label: 'Local Tips', icon: '💡' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-1 justify-center ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ITINERARY TAB */}
        {activeTab === 'itinerary' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pb-12">
            {/* Day Selector Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden sticky top-20">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-gray-800">Your Journey</h3>
                </div>
                <div className="p-2">
                  {data.dayPlans.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveDay(i)}
                      className={`w-full text-left px-3 py-3 rounded-xl transition-all mb-1 ${
                        activeDay === i
                          ? 'bg-orange-500 text-white shadow-sm'
                          : 'hover:bg-orange-50 text-gray-700'
                      }`}
                    >
                      <div className={`text-xs font-semibold ${activeDay === i ? 'text-orange-200' : 'text-orange-500'}`}>
                        DAY {d.day}
                      </div>
                      <div className="text-xs font-medium mt-0.5 leading-tight">{d.title}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Day Detail */}
            <div className="lg:col-span-3">
              {day && (
                <div className="space-y-5">
                  <div className="bg-gradient-to-r from-orange-500 to-rose-500 rounded-2xl p-5 text-white">
                    <div className="text-orange-200 text-xs font-semibold mb-1">DAY {day.day}</div>
                    <h2 className="text-xl font-bold">{day.title}</h2>
                    {day.tips && (
                      <p className="text-orange-100/80 text-xs mt-2 flex items-start gap-1.5">
                        <Info className="w-3 h-3 mt-0.5 shrink-0" /> {day.tips}
                      </p>
                    )}
                  </div>

                  {timeSlots.map(slot => (
                    <div key={slot.key} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                      <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100">
                        <slot.icon className={`w-4 h-4 ${slot.color}`} />
                        <span className="text-sm font-bold text-gray-800">{slot.label}</span>
                        <span className="text-xs text-gray-400 ml-auto">{slot.activities.length} activities</span>
                      </div>
                      <div className="divide-y divide-gray-50">
                        {slot.activities.map((activity, ai) => {
                          const key = `${slot.key}-${ai}`;
                          const Icon = activityIcons[activity.type] || Camera;
                          return (
                            <div key={key} className="p-4 hover:bg-gray-50/50 transition-colors">
                              <div className="flex items-start gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${activityTypeColors[activity.type] || 'bg-gray-100 text-gray-600'}`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-semibold text-sm text-gray-900">{activity.name}</span>
                                    {activity.mustVisit && (
                                      <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-medium flex items-center gap-1">
                                        <Star className="w-2.5 h-2.5" /> Must Visit
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${activityTypeColors[activity.type] || ''}`}>{activity.type}</span>
                                    {activity.duration && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{activity.duration}</span>}
                                    {activity.estimatedCost && <span className="flex items-center gap-1"><IndianRupee className="w-3 h-3" />{activity.estimatedCost}</span>}
                                  </div>

                                  {activity.description && (
                                    <button
                                      onClick={() => toggleActivity(key)}
                                      className="flex items-center gap-1 text-xs text-orange-500 hover:text-orange-600 mt-1.5 transition-colors"
                                    >
                                      {expandedActivities[key] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                      {expandedActivities[key] ? 'Less' : 'More details'}
                                    </button>
                                  )}

                                  {expandedActivities[key] && activity.description && (
                                    <p className="text-xs text-gray-500 mt-2 leading-relaxed bg-gray-50 rounded-lg p-3">
                                      {activity.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TRANSPORT TAB */}
        {activeTab === 'transport' && (
          <div className="pb-12 space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 flex items-start gap-2">
              <Info className="w-4 h-4 mt-0.5 shrink-0" />
              <span>Prices are estimates and may vary by season, class, and availability. Check official booking platforms for exact fares.</span>
            </div>
            {data.transport?.map((t, i) => {
              const Icon = transportIcons[t.mode];
              const gradient = transportColors[t.mode];
              return (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className={`bg-gradient-to-r ${gradient} px-5 py-4 text-white flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <div>
                        <div className="font-bold capitalize">{t.mode}</div>
                        <div className="text-white/70 text-xs">{t.duration}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{t.estimatedCost}</div>
                      {t.recommended && (
                        <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Recommended</span>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${easeColors[t.ease]}`}>
                        {t.ease} Journey
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{t.details}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* HOTELS TAB */}
        {activeTab === 'hotels' && (
          <div className="pb-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.hotels?.map((hotel, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900">{hotel.name}</h3>
                      <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" /> {hotel.location}
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <div className="text-sm font-bold text-orange-600">{hotel.pricePerNight}</div>
                      <div className="text-xs text-gray-400">per night</div>
                    </div>
                  </div>

                  <span className="inline-block px-2.5 py-0.5 bg-orange-50 text-orange-600 text-xs rounded-full font-medium border border-orange-100 mb-3">
                    {hotel.category}
                  </span>

                  {hotel.highlights?.length > 0 && (
                    <div className="space-y-1.5">
                      {hotel.highlights.map((h, hi) => (
                        <div key={hi} className="flex items-start gap-2 text-xs text-gray-600">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                          {h}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TIPS TAB */}
        {activeTab === 'tips' && (
          <div className="pb-12 space-y-6">
            {/* Local Food */}
            {data.localFood?.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-rose-500" /> Must-Try Local Food
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.localFood.map(food => (
                    <span key={food} className="px-3 py-1.5 bg-rose-50 border border-rose-100 text-rose-700 text-xs rounded-full font-medium">
                      🍛 {food}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Travel Tips */}
            {data.travelTips?.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-500" /> Insider Travel Tips
                </h3>
                <div className="space-y-3">
                  {data.travelTips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl">
                      <div className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{data.city}</span> · {data.days}-day itinerary
          </div>
          <button
            onClick={onNewPlan}
            className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-sm font-semibold rounded-xl hover:shadow-md hover:scale-105 transition-all"
          >
            Plan Another Trip
          </button>
        </div>
      </div>
    </div>
  );
}
