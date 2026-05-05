export interface Booking {
  id: number;
  hotelId: number;
  hotelName: string;
  reservedDate: string;    // 'YYYY-MM-DD'
  reservedForUser: string;
  amountPaid: number;
}
