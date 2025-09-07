package com.telsusko.ParcelMangementSpringBoot.Controller;

import com.telsusko.ParcelMangementSpringBoot.Model.Booking;
import com.telsusko.ParcelMangementSpringBoot.Service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Book;
import java.sql.Timestamp;
import java.time.OffsetDateTime;

@RestController
@RequestMapping("/PickupDropUpdate")
@CrossOrigin(origins = "http://localhost:3000")
public class PickupUpdateController {

    @Autowired
    BookingService bookingService;
    @PostMapping("/{bookingId}/{pickup}/{dropoff}")
    public Booking pickupDropUpdate(@PathVariable long bookingId,@PathVariable String pickup,@PathVariable String dropoff)
    {
        Booking booking=bookingService.getBookingDetailsByID(bookingId);
        if(booking==null)
        {
            return null;
        }
        OffsetDateTime pickupTime = OffsetDateTime.parse(pickup);
        OffsetDateTime dropoffTime = OffsetDateTime.parse(dropoff);

        Timestamp pickupTimestamp = Timestamp.from(pickupTime.toInstant());
        Timestamp dropoffTimestamp = Timestamp.from(dropoffTime.toInstant());

        bookingService.updatePickupDrop(booking,pickupTimestamp,dropoffTimestamp);
        return booking;
    }
}
