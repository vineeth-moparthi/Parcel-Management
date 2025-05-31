package com.telsusko.ParcelMangementSpringBoot.Controller;

import com.telsusko.ParcelMangementSpringBoot.Model.Booking;
import com.telsusko.ParcelMangementSpringBoot.Model.User;
import com.telsusko.ParcelMangementSpringBoot.Service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Book;
import java.util.List;
@RestController
public class BookingController {

    @Autowired
    BookingService bookingService;

    @PostMapping("/booking")
    public void addBoookingDetails(@RequestBody Booking booking)
    {
        bookingService.addBookingDetails(booking);
    }
    @GetMapping("/booking")
    List<Booking> getBookingDetails()
    {
        return bookingService.getBookingDetails();
    }

    @GetMapping("/booking/{bookingId}")
    Booking getBookingDetailsById(@PathVariable long bookingId)
    {
        return bookingService.getBookingDetailsByID(bookingId);
    }

    @GetMapping("/previousBooking/{userId}")
    List<Booking> getPreviousBookingsByUserId(@PathVariable long userId)
    {
        return bookingService.getPreviousBookingsByUserId(userId);
    }
}
