package com.assessment.auth.model;

import jakarta.persistence.*;

@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long hotelId;
    private String hotelName;
    private String reservedDate;
    private String reservedForUser;
    private double amountPaid;

    public Booking() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getHotelId() { return hotelId; }
    public void setHotelId(Long hotelId) { this.hotelId = hotelId; }

    public String getHotelName() { return hotelName; }
    public void setHotelName(String hotelName) { this.hotelName = hotelName; }

    public String getReservedDate() { return reservedDate; }
    public void setReservedDate(String reservedDate) { this.reservedDate = reservedDate; }

    public String getReservedForUser() { return reservedForUser; }
    public void setReservedForUser(String reservedForUser) { this.reservedForUser = reservedForUser; }

    public double getAmountPaid() { return amountPaid; }
    public void setAmountPaid(double amountPaid) { this.amountPaid = amountPaid; }
}
