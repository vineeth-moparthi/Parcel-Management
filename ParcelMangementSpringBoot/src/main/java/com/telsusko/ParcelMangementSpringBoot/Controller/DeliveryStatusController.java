package com.telsusko.ParcelMangementSpringBoot.Controller;

import com.telsusko.ParcelMangementSpringBoot.Model.Booking;
import com.telsusko.ParcelMangementSpringBoot.Service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Book;

@RestController
@RequestMapping("/DeliveryStatus")
public class DeliveryStatusController {

    @Autowired
    BookingService bookingService;
    @PostMapping("/{bookingId}/{status}")
    public Booking updateStatus(@PathVariable long bookingId,@PathVariable String status)
    {
        Booking booking=bookingService.getBookingDetailsByID(bookingId);
        if(booking==null)
        {
            return null;
        }
        bookingService.updateStatus(booking,status);
        return booking;
    }
}
