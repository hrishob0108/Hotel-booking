package com.assessment.auth.model;

import jakarta.persistence.*;
import java.util.Map;

@Entity
@Table(name = "hotels")
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double pricePerNight;
    private String description;
    private double rating;
    private String imageUrl;

    @ElementCollection
    @CollectionTable(name = "hotel_availability", joinColumns = @JoinColumn(name = "hotel_id"))
    @MapKeyColumn(name = "available_date")
    @Column(name = "is_available")
    private Map<String, Boolean> availability;

    public Hotel() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getPricePerNight() { return pricePerNight; }
    public void setPricePerNight(double pricePerNight) { this.pricePerNight = pricePerNight; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Map<String, Boolean> getAvailability() { return availability; }
    public void setAvailability(Map<String, Boolean> availability) { this.availability = availability; }
}
