import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hotel } from '../../../models/hotel.model';
import { BookingService } from '../../../core/booking.service';
import { AuthService } from '../../../core/auth.service';

interface CalendarDay {
  date: string;       // 'YYYY-MM-DD'
  label: string;      // 'Mon', 'Tue', etc.
  dayNum: string;     // '01', '05', etc.
  available: boolean;
  booked: boolean;
  isToday: boolean;
  isPast: boolean;
}

@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.css']
})
export class HotelCardComponent implements OnInit {
  @Input() hotel!: Hotel;

  calendarDays: CalendarDay[] = [];
  selectedDate: string | null = null;
  bookingStatus: 'idle' | 'success' | 'error' = 'idle';
  bookingMessage = '';
  isBooking = false;

  private readonly DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor(
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.buildCalendar();
    // Refresh calendar when bookings change
    this.bookingService.bookings$.subscribe(() => {
      this.buildCalendar();
    });
  }

  buildCalendar(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Start from Monday of current week
    const monday = new Date(today);
    const day = today.getDay(); // 0=Sun
    monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));

    this.calendarDays = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const dateKey = d.toISOString().split('T')[0];

      // Safe access to availability map
      const hotelAvailable = this.hotel.availability ? this.hotel.availability[dateKey] !== false : true;
      const alreadyBooked = this.bookingService.isDateBooked(this.hotel.id, dateKey);
      const isPast = d < today;

      this.calendarDays.push({
        date: dateKey,
        label: this.DAY_LABELS[d.getDay()],
        dayNum: d.getDate().toString().padStart(2, '0'),
        available: hotelAvailable && !alreadyBooked && !isPast,
        booked: alreadyBooked,
        isToday: d.getTime() === today.getTime(),
        isPast
      });
    }
  }

  selectDate(day: CalendarDay): void {
    if (!day.available) return;
    this.selectedDate = day.date === this.selectedDate ? null : day.date;
    this.bookingStatus = 'idle';
  }

  bookIt(): void {
    if (!this.selectedDate) return;

    this.isBooking = true;
    const username = this.authService.getUsername() || 'user';

    this.bookingService.addBooking({
      hotelId: this.hotel.id,
      hotelName: this.hotel.name,
      reservedDate: this.selectedDate!,
      reservedForUser: username,
      amountPaid: this.hotel.pricePerNight
    }).subscribe({
      next: () => {
        this.bookingStatus = 'success';
        this.bookingMessage = `Your booking for the Hotel ${this.hotel.name} is successful`;
        this.selectedDate = null;
        this.isBooking = false;
      },
      error: () => {
        this.bookingStatus = 'error';
        this.bookingMessage = 'Please try again!!';
        this.isBooking = false;
      }
    });
  }

  getDayClass(day: CalendarDay): string {
    if (day.isPast) return 'day past';
    if (day.booked) return 'day booked';
    if (!day.available) return 'day unavailable';
    if (day.date === this.selectedDate) return 'day selected';
    if (day.isToday) return 'day today available';
    return 'day available';
  }

  dismissMessage(): void {
    this.bookingStatus = 'idle';
  }
}
