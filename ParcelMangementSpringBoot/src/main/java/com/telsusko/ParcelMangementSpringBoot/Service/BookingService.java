package com.telsusko.ParcelMangementSpringBoot.Service;

import com.telsusko.ParcelMangementSpringBoot.Model.Booking;
import com.telsusko.ParcelMangementSpringBoot.Repo.BookingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
@Service
public class BookingService{

    @Autowired
    BookingRepo bookingRepo;

    public void addBookingDetails(Booking booking) {
        bookingRepo.save(booking);
    }

    public Booking getBookingDetailsByID(long bookingId) {
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
}
