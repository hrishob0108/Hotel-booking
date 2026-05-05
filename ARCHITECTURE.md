# Architecture Document - Hotel Booking System

## Overview
The Hotel Booking System is a full-stack application built with a decoupled architecture consisting of a Spring Boot backend and an Angular frontend. It provides a seamless experience for users to search for hotels, view availability on a calendar, and manage bookings, while providing administrative capabilities for data management.

## Tech Stack
- **Frontend**: Angular 17, Angular Material, RxJS, TailwindCSS/Vanilla CSS.
- **Backend**: Spring Boot 3.2, Spring Security, Spring Data JPA.
- **Database**: PostgreSQL (hosted on NeonDB).
- **Authentication**: Stateless JWT-based authentication.
- **Deployment**: Vercel (Frontend) and Render (Backend/Docker).

## Design Decisions
1. **Stateless Authentication**: Used JWT to ensure the backend remains stateless, allowing for easier scaling and better security for a distributed frontend-backend setup.
2. **Component-Based UI**: Built with Angular's standalone components for better modularity and reusability.
3. **Reactive State**: Utilized RxJS streams for handling asynchronous data fetching and UI updates.
4. **Relational Schema**: Used PostgreSQL to handle complex relationships between Users, Hotels, and Bookings with ACID compliance.

## Extensibility
- **Microservices Ready**: The Auth Service is designed to be independent, allowing for the addition of a separate "Payment Service" or "Review Service" in the future.
- **Role-Based Access Control (RBAC)**: Currently supports USER and ADMIN roles, easily expandable to support "Hotel Manager" or "Moderator" roles.
- **Environment Driven**: API endpoints and CORS settings are environment-driven, making it easy to move between local, staging, and production.
