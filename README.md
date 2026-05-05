# Hotel Booking System

A full-stack hotel booking application with Spring Boot and Angular.

## Features
- **User Authentication**: Secure login/signup with JWT and role-based access (USER/ADMIN).
- **Hotel Discovery**: Browse hotels and view availability.
- **Calendar View**: Interactive 1-week calendar for room availability.
- **Booking Management**: Create and track hotel bookings.
- **Admin Dashboard**: Comprehensive dashboard for managing hotels and users.

## Live Demo
- **Frontend**: [https://hotel-booking-gamma-nine.vercel.app](https://hotel-booking-gamma-nine.vercel.app)
- **Backend API**: [https://hotel-booking-oy5n.onrender.com](https://hotel-booking-oy5n.onrender.com)

## Local Setup

### Backend (auth-service)
1. Navigate to `auth-service/`.
2. Configure your database in `src/main/resources/application.properties`.
3. Run with Maven:
   ```bash
   mvn spring-boot:run
   ```

### Frontend (hotel-booking-app)
1. Navigate to `hotel-booking-app/`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update `src/environments/environment.ts` with your local backend URL.
4. Run the development server:
   ```bash
   ng serve
   ```
5. Open `http://localhost:4200` in your browser.

## Deployment Instructions
- **Backend**: Deploy to Render using the provided `Dockerfile`. Set `APP_CORS_ALLOWED_ORIGINS` as an environment variable.
- **Frontend**: Deploy to Vercel. Set the output directory to `dist/hotel-booking-app/browser`.
