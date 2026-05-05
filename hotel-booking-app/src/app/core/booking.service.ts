import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../models/booking.model';
import { Hotel } from '../models/hotel.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly BASE_URL = environment.apiUrl;
  private bookingsSubject = new BehaviorSubject<Booking[]>([]);
  bookings$ = this.bookingsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.BASE_URL}/hotels`);
  }

  addBooking(booking: Omit<Booking, 'id'>): Observable<Booking> {
    return this.http.post<Booking>(`${this.BASE_URL}/bookings`, booking).pipe(
      tap(() => this.refreshBookings())
    );
  }

  refreshBookings(): void {
    this.http.get<Booking[]>(`${this.BASE_URL}/bookings`).subscribe(
      bookings => this.bookingsSubject.next(bookings)
    );
  }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.BASE_URL}/bookings`);
  }

  isDateBooked(hotelId: number, date: string): boolean {
    // This is still useful for local calendar checks, but we'll need to sync it
    return this.bookingsSubject.value.some(b => b.hotelId === hotelId && b.reservedDate === date);
  }

  hasUserBookedHotel(hotelId: number, username: string): boolean {
    return this.bookingsSubject.value.some(b => b.hotelId === hotelId && b.reservedForUser === username);
  }
}
