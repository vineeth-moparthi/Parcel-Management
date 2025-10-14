package com.telsusko.ParcelMangementSpringBoot.Controller;

import com.telsusko.ParcelMangementSpringBoot.Model.Booking;
import com.telsusko.ParcelMangementSpringBoot.Service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/DeliveryStatus")
public class DeliveryStatusController {

    @Autowired
    BookingService bookingService;

    @PutMapping("/{bookingId}")
    public Booking updateStatus(@PathVariable long bookingId, @RequestBody String status) {
        Booking booking = bookingService.getBookingDetailsByID(bookingId);
        if (booking == null) {
            return null;
        }
        bookingService.updateStatus(booking, status);
        return booking;
    }
}
