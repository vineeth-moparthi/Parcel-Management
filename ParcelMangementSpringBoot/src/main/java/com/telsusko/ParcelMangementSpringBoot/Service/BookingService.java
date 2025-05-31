package com.telsusko.ParcelMangementSpringBoot.Service;

import com.telsusko.ParcelMangementSpringBoot.Model.Booking;
import com.telsusko.ParcelMangementSpringBoot.Repo.BookingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
