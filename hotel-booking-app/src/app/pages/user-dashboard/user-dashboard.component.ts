import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { BookingService } from '../../core/booking.service';
import { HotelCardComponent } from './hotel-card/hotel-card.component';
import { Hotel } from '../../models/hotel.model';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, HotelCardComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  hotels: Hotel[] = [];
  filteredHotels: Hotel[] = [];
  username: string;
  currentDate: string;
  activeFilter = 'all';
  searchQuery = '';

  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    private router: Router
  ) {
    this.username = authService.getUsername() || 'Guest';
    this.currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  ngOnInit(): void {
    this.bookingService.getHotels().subscribe(hotels => {
      this.hotels = hotels;
      this.filteredHotels = hotels;
    });
    // Also sync bookings to mark taken dates
    this.bookingService.refreshBookings();
  }

  onSearch(event: any): void {
    this.searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
    this.applyFilters();
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredHotels = this.hotels.filter(hotel => {
      const matchesSearch = hotel.name.toLowerCase().includes(this.searchQuery) || 
                           hotel.description.toLowerCase().includes(this.searchQuery);
      
      let matchesFilter = true;
      if (this.activeFilter === 'budget') matchesFilter = hotel.pricePerNight < 200;
      if (this.activeFilter === 'luxury') matchesFilter = hotel.pricePerNight >= 200;
      if (this.activeFilter === 'mine') {
        // Show hotels where the current user has at least one booking
        matchesFilter = this.bookingService.hasUserBookedHotel(hotel.id, this.username);
      }
      
      return matchesSearch && matchesFilter;
    });
  }

  resetSearch(): void {
    this.searchQuery = '';
    this.activeFilter = 'all';
    this.filteredHotels = [...this.hotels];
  }

  logout(): void {
    this.authService.logout();
  }
}
