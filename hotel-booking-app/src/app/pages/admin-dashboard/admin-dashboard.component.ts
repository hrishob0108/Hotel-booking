import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';
import { BookingService } from '../../core/booking.service';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  bookings: Booking[] = [];
  username: string;
  totalRevenue = 0;
  topHotel = 'N/A';
  bookingsThisWeek = 0;

  constructor(
    private authService: AuthService,
    private bookingService: BookingService
  ) {
    this.username = authService.getUsername() || 'Admin';
  }

  ngOnInit(): void {
    // Subscribe to live booking updates
    this.bookingService.bookings$.subscribe(bookings => {
      this.bookings = bookings;
      this.totalRevenue = bookings.reduce((sum, b) => sum + b.amountPaid, 0);
      this.bookingsThisWeek = bookings.length;
      
      if (bookings.length > 0) {
        const counts = bookings.reduce((acc, b) => {
          acc[b.hotelName] = (acc[b.hotelName] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        this.topHotel = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
      }
    });
    this.bookingService.refreshBookings();
  }

  logout(): void {
    this.authService.logout();
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
}
