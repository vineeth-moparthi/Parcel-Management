package com.telsusko.ParcelMangementSpringBoot.Service;
import java.time.LocalDateTime;
import com.telsusko.ParcelMangementSpringBoot.Model.Booking;
import com.telsusko.ParcelMangementSpringBoot.Repo.BookingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService{

    @Autowired
    BookingRepo bookingRepo;

    public void addBookingDetails(Booking booking) {

        LocalDateTime pickupTime = booking.getPickupTime().toLocalDateTime(); // Assuming this is LocalDateTime

        if (booking.getDeliveryType().equalsIgnoreCase("express")) {
            // Express: next day
            booking.setDropoffTime(Timestamp.valueOf(pickupTime.plusDays(1)));
        } else if (booking.getDeliveryType().equalsIgnoreCase("standard")) {
            // Standard: 1 week later
            booking.setDropoffTime(Timestamp.valueOf(pickupTime.plusWeeks(1)));
        }

        double weight=booking.getWeight();
        String packagingType= booking.getPackingPreference();
        String deliveryType= booking.getDeliveryType();

        double cost=calculateParcelCost(weight,deliveryType,packagingType);

        booking.setStatus("Booked");
        booking.setServiceCost(cost);
        booking.setBookingDate(Timestamp.valueOf(LocalDateTime.now()));
        bookingRepo.save(booking);
    }

//    public Booking getBookingDetailsByUserIDAndBookingID(long userId, long bookingId) {
//        return bookingRepo.findByUserIdAndBookingId(userId,bookingId).orElse(null);
//    }

    public Booking getBookingDetailsByID( long bookingId) {
        return bookingRepo.findById(bookingId).orElse(null);
    }
    public List<Booking> getBookingDetails() {
        return bookingRepo.findAll();
    }

    public List<Booking> getPreviousBookingsByUserId(long userId) {
        return bookingRepo.findByUserId(userId);
    }

    public void updateStatus(Booking booking,String status) {
        booking.setStatus(status);
        bookingRepo.save(booking);
    }

    public void updatePickupDrop(Booking booking,Timestamp pickup, Timestamp drop) {
        booking.setPickupTime(pickup);
        booking.setDropoffTime(drop);
        bookingRepo.save(booking);
    }

    public Booking getBookingDetailsByUserIDAndBookingId(long userId, long bookingId) {
        return bookingRepo.findByUserIdAndBookingId(userId,bookingId).orElse(null);
    }

    public double calculateParcelCost(double weight, String deliveryType, String packingPreference) {
        double baseRatePerKg = 10.0;

        // Delivery type multiplier
        double deliveryMultiplier = deliveryType.equalsIgnoreCase("Express") ? 1.5 : 1.0;

        // Packaging multiplier
        double packagingMultiplier;
        switch (packingPreference.toLowerCase()) {
            case "fragile":
                packagingMultiplier = 1.5;
                break;
            case "gift wrap":
                packagingMultiplier = 1.2;
                break;
            default:
                packagingMultiplier = 1.0; // Basic
        }

        double cost = weight * baseRatePerKg * deliveryMultiplier * packagingMultiplier;
        return cost;
    }

    public void updatePickup(Booking booking, Timestamp pickupTimestamp) {
        booking.setPickupTime(pickupTimestamp);
        bookingRepo.save((booking));
    }
}
