package com.assessment.auth.config;

import com.assessment.auth.model.AppUser;
import com.assessment.auth.model.Hotel;
import com.assessment.auth.repository.HotelRepository;
import com.assessment.auth.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final HotelRepository hotelRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, 
                           HotelRepository hotelRepository, 
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.hotelRepository = hotelRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedUsers();
        seedHotels();
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            // Initial System Admin
            userRepository.save(new AppUser("admin", passwordEncoder.encode("admin123"), "ADMIN"));
        }
    }

    private void seedHotels() {
        if (hotelRepository.count() < 15) {
            // Clear and re-seed to ensure a fresh, consistent inventory
            hotelRepository.deleteAll();
            
            hotelRepository.save(createHotel("The Grand Azure", 289, "Luxury oceanfront resort with panoramic sea views.", 4.8, "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400", List.of(1, 4)));
            hotelRepository.save(createHotel("Sapphire Heights Hotel", 175, "Contemporary city-center hotel with rooftop pool.", 4.5, "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400", List.of(0, 2, 6)));
            hotelRepository.save(createHotel("Emerald Crest Inn", 120, "Charming boutique hotel nestled in the mountains.", 4.6, "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400", List.of(3, 5)));
            hotelRepository.save(createHotel("Crimson Palace", 350, "An opulent 5-star experience with Michelin-starred dining.", 4.9, "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400", List.of(0, 1, 5)));
            hotelRepository.save(createHotel("Sunset Bay Resort", 210, "Beachside haven with stunning sunset views.", 4.7, "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400", List.of(2, 4)));
            
            // New Hotels
            hotelRepository.save(createHotel("Obsidian City Suites", 195, "Sleek, industrial-style suites in the heart of the business district.", 4.4, "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400", List.of(1, 3)));
            hotelRepository.save(createHotel("Willow Creek Lodge", 145, "Rustic elegance on the banks of a peaceful forest stream.", 4.3, "https://images.unsplash.com/photo-1449156001437-3a16d1daae39?w=400", List.of(0, 6)));
            hotelRepository.save(createHotel("Ivory Sands Boutique", 240, "Minimalist white-sand boutique with private beach access.", 4.7, "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400", List.of(2, 5)));
            hotelRepository.save(createHotel("Golden Peak Chalet", 310, "High-altitude luxury with ski-in/ski-out convenience.", 4.8, "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=400", List.of(3, 4)));
            hotelRepository.save(createHotel("Neon Horizon Hub", 130, "Tech-focused capsule hotel for the modern digital nomad.", 4.1, "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=400", List.of(1, 2)));
            hotelRepository.save(createHotel("Marble Arch Manor", 420, "Heritage estate with antique furnishings and English gardens.", 4.9, "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400", List.of(0, 4, 5)));
            hotelRepository.save(createHotel("Veridian Forest Retreat", 160, "Eco-friendly cabins deep in the redwood canopy.", 4.6, "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400", List.of(2, 3, 6)));
            hotelRepository.save(createHotel("Crystal Lagoon Villa", 550, "Overwater villas with glass floors and private infinity pools.", 5.0, "https://images.unsplash.com/photo-1439130490301-25e322d88054?w=400", List.of(1, 4)));
            hotelRepository.save(createHotel("Amber Valley Ranch", 185, "Western-style ranch offering horse riding and stargazing.", 4.5, "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400", List.of(0, 3, 6)));
            hotelRepository.save(createHotel("Silver Slate Urban", 155, "Modern loft apartments with floor-to-ceiling city views.", 4.2, "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400", List.of(2, 5)));
        }
    }

    private Hotel createHotel(String name, double price, String desc, double rating, String img, List<Integer> unavailableDays) {
        Hotel h = new Hotel();
        h.setName(name);
        h.setPricePerNight(price);
        h.setDescription(desc);
        h.setRating(rating);
        h.setImageUrl(img);
        
        Map<String, Boolean> availability = new HashMap<>();
        LocalDate monday = LocalDate.now().minusDays(LocalDate.now().getDayOfWeek().getValue() - 1);
        for (int i = 0; i < 7; i++) {
            String date = monday.plusDays(i).toString();
            availability.put(date, !unavailableDays.contains(i));
        }
        h.setAvailability(availability);
        return h;
    }
}
