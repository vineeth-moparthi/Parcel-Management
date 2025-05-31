package com.telsusko.ParcelMangementSpringBoot.Controller;

import com.telsusko.ParcelMangementSpringBoot.Model.Booking;
import com.telsusko.ParcelMangementSpringBoot.Service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.awt.print.Book;
import java.sql.Timestamp;
import java.time.OffsetDateTime;

@RestController
@RequestMapping("/PickupDropUpdate")
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
