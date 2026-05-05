import { Hotel } from '../models/hotel.model';

/**
 * Generate availability for current week.
 * Some dates are randomly unavailable to simulate real data.
 */
function generateWeekAvailability(unavailableDays: number[]): { [date: string]: boolean } {
  const availability: { [date: string]: boolean } = {};
  const today = new Date();
  // Start from Monday of current week
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const key = d.toISOString().split('T')[0];
    availability[key] = !unavailableDays.includes(i);
  }
  return availability;
}

export const HOTELS: Hotel[] = [
  {
    id: 1,
    name: 'The Grand Azure',
    pricePerNight: 289,
    description: 'Luxury oceanfront resort with panoramic sea views and world-class amenities.',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
    availability: generateWeekAvailability([1, 4]) // Tue & Fri unavailable
  },
  {
    id: 2,
    name: 'Sapphire Heights Hotel',
    pricePerNight: 175,
    description: 'Contemporary city-center hotel with rooftop pool and spa facilities.',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
    availability: generateWeekAvailability([0, 2, 6]) // Mon, Wed, Sun unavailable
  },
  {
    id: 3,
    name: 'Emerald Crest Inn',
    pricePerNight: 120,
    description: 'Charming boutique hotel nestled in the mountains with breathtaking views.',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400',
    availability: generateWeekAvailability([3, 5]) // Thu & Sat unavailable
  },
  {
    id: 4,
    name: 'Crimson Palace',
    pricePerNight: 350,
    description: 'An opulent 5-star experience with Michelin-starred dining and private butler.',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
    availability: generateWeekAvailability([0, 1, 5]) // Mon, Tue, Sat unavailable
  },
  {
    id: 5,
    name: 'Sunset Bay Resort',
    pricePerNight: 210,
    description: 'Beachside haven with stunning sunset views, water sports, and beachfront dining.',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400',
    availability: generateWeekAvailability([2, 4]) // Wed & Fri unavailable
  }
];
