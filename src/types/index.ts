export interface TripFormData {
  city: string;
  days: number;
  travelerType: 'solo' | 'couple' | 'family' | 'group';
  budget: 'budget' | 'mid' | 'luxury';
  interests: string[];
}

export interface DayPlan {
  day: number;
  title: string;
  morning: Activity[];
  afternoon: Activity[];
  evening: Activity[];
  tips: string;
}

export interface Activity {
  name: string;
  type: 'attraction' | 'restaurant' | 'cafe' | 'hotel' | 'activity';
  description: string;
  estimatedCost: string;
  duration: string;
  mustVisit?: boolean;
}

export interface TransportOption {
  mode: 'flight' | 'train' | 'bus' | 'car';
  duration: string;
  estimatedCost: string;
  ease: 'Easy' | 'Moderate' | 'Challenging';
  details: string;
  recommended?: boolean;
}

export interface HotelRecommendation {
  name: string;
  category: string;
  pricePerNight: string;
  location: string;
  highlights: string[];
}

export interface ItineraryData {
  city: string;
  days: number;
  cityOverview: string;
  bestTimeToVisit: string;
  currency: string;
  language: string;
  dayPlans: DayPlan[];
  transport: TransportOption[];
  hotels: HotelRecommendation[];
  mustVisit: string[];
  localFood: string[];
  travelTips: string[];
  estimatedBudget: {
    budget: string;
    mid: string;
    luxury: string;
  };
}

export interface SavedItinerary {
  id: string;
  city: string;
  days: number;
  traveler_type: string;
  budget: string;
  interests: string[];
  itinerary_data: ItineraryData;
  created_at: string;
}
