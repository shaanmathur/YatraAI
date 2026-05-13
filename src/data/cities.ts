export interface CityInfo {
  name: string;
  state: string;
  region: string;
  image: string;
  tagline: string;
  color: string;
}

export const popularCities: CityInfo[] = [
  { name: 'Jaipur', state: 'Rajasthan', region: 'North', image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg', tagline: 'The Pink City', color: '#E8A87C' },
  { name: 'Varanasi', state: 'Uttar Pradesh', region: 'North', image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg', tagline: 'City of Temples', color: '#F4A261' },
  { name: 'Mumbai', state: 'Maharashtra', region: 'West', image: 'https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg', tagline: 'City of Dreams', color: '#2D6A4F' },
  { name: 'Delhi', state: 'Delhi', region: 'North', image: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg', tagline: 'Heart of India', color: '#E76F51' },
  { name: 'Goa', state: 'Goa', region: 'West', image: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg', tagline: 'Pearl of the Orient', color: '#52B788' },
  { name: 'Kolkata', state: 'West Bengal', region: 'East', image: 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg', tagline: 'City of Joy', color: '#457B9D' },
  { name: 'Chennai', state: 'Tamil Nadu', region: 'South', image: 'https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg', tagline: 'Gateway to the South', color: '#E9C46A' },
  { name: 'Agra', state: 'Uttar Pradesh', region: 'North', image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg', tagline: 'City of the Taj', color: '#F4A261' },
  { name: 'Udaipur', state: 'Rajasthan', region: 'North', image: 'https://images.pexels.com/photos/3879071/pexels-photo-3879071.jpeg', tagline: 'City of Lakes', color: '#264653' },
  { name: 'Mysuru', state: 'Karnataka', region: 'South', image: 'https://images.pexels.com/photos/3573351/pexels-photo-3573351.jpeg', tagline: 'City of Palaces', color: '#E76F51' },
  { name: 'Amritsar', state: 'Punjab', region: 'North', image: 'https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg', tagline: 'Holy City of Sikhs', color: '#D4A373' },
  { name: 'Bengaluru', state: 'Karnataka', region: 'South', image: 'https://images.pexels.com/photos/739987/pexels-photo-739987.jpeg', tagline: 'Silicon Valley of India', color: '#40916C' },
  { name: 'Hyderabad', state: 'Telangana', region: 'South', image: 'https://images.pexels.com/photos/3573349/pexels-photo-3573349.jpeg', tagline: 'City of Nizams', color: '#B5838D' },
  { name: 'Rishikesh', state: 'Uttarakhand', region: 'North', image: 'https://images.pexels.com/photos/3480494/pexels-photo-3480494.jpeg', tagline: 'Yoga Capital of the World', color: '#52B788' },
  { name: 'Darjeeling', state: 'West Bengal', region: 'East', image: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg', tagline: 'Queen of the Hills', color: '#457B9D' },
  { name: 'Shimla', state: 'Himachal Pradesh', region: 'North', image: 'https://images.pexels.com/photos/3573351/pexels-photo-3573351.jpeg', tagline: 'Queen of Hills', color: '#4A90D9' },
  { name: 'Kochi', state: 'Kerala', region: 'South', image: 'https://images.pexels.com/photos/962980/pexels-photo-962980.jpeg', tagline: 'Queen of the Arabian Sea', color: '#2D6A4F' },
  { name: 'Jodhpur', state: 'Rajasthan', region: 'North', image: 'https://images.pexels.com/photos/3581369/pexels-photo-3581369.jpeg', tagline: 'The Blue City', color: '#4361EE' },
  { name: 'Pushkar', state: 'Rajasthan', region: 'North', image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg', tagline: 'City of Brahma', color: '#F77F00' },
  { name: 'Manali', state: 'Himachal Pradesh', region: 'North', image: 'https://images.pexels.com/photos/2104014/pexels-photo-2104014.jpeg', tagline: 'Valley of Gods', color: '#2B9348' },
];

export const allCities = [
  'Agra', 'Ahmedabad', 'Ajmer', 'Allahabad', 'Amritsar', 'Aurangabad',
  'Bengaluru', 'Bhopal', 'Bhubaneswar', 'Bikaner',
  'Chennai', 'Coimbatore',
  'Darjeeling', 'Dehradun', 'Delhi',
  'Goa', 'Guwahati',
  'Hampi', 'Haridwar', 'Hyderabad',
  'Indore',
  'Jaipur', 'Jaisalmer', 'Jammu', 'Jodhpur',
  'Kochi', 'Kodaikanal', 'Kolkata', 'Kozhikode',
  'Leh', 'Lucknow',
  'Madurai', 'Manali', 'Mumbai', 'Mussoorie', 'Mysuru',
  'Nagpur', 'Nainital',
  'Ooty', 'Ootacamund',
  'Patna', 'Pondicherry', 'Pune', 'Pushkar',
  'Raipur', 'Ranchi', 'Rishikesh',
  'Shillong', 'Shimla', 'Srinagar', 'Surat',
  'Thanjavur', 'Thiruvananthapuram', 'Tirupati',
  'Udaipur', 'Ujjain',
  'Vadodara', 'Varanasi', 'Visakhapatnam',
  'Wayanad',
];

export const interests = [
  { id: 'history', label: 'History & Heritage', icon: '🏛️' },
  { id: 'food', label: 'Food & Cuisine', icon: '🍜' },
  { id: 'nature', label: 'Nature & Outdoors', icon: '🌿' },
  { id: 'adventure', label: 'Adventure & Sports', icon: '🧗' },
  { id: 'spiritual', label: 'Spiritual & Temples', icon: '🕌' },
  { id: 'shopping', label: 'Shopping & Markets', icon: '🛍️' },
  { id: 'art', label: 'Art & Culture', icon: '🎨' },
  { id: 'nightlife', label: 'Nightlife & Entertainment', icon: '🌙' },
  { id: 'wellness', label: 'Wellness & Yoga', icon: '🧘' },
  { id: 'photography', label: 'Photography', icon: '📸' },
];
