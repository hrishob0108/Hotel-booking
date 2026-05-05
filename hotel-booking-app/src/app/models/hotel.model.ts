export interface Hotel {
  id: number;
  name: string;
  pricePerNight: number;
  description: string;
  rating: number;
  imageUrl: string;
  availability: { [date: string]: boolean }; // key: 'YYYY-MM-DD', value: true=available
}
