package com.telsusko.ParcelMangementSpringBoot.Controller;

import com.telsusko.ParcelMangementSpringBoot.Model.Booking;
import com.telsusko.ParcelMangementSpringBoot.Model.User;
import com.telsusko.ParcelMangementSpringBoot.Service.BookingService;
import com.telsusko.ParcelMangementSpringBoot.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/TrackingStatus")
public class TrackingController {
    @Autowired
    BookingService bookingService;

    @Autowired
    UserService userService;

    @GetMapping("/{bookingId}")
    public Booking getTrackingStatus(@PathVariable long bookingId)
    {
        Booking booking=bookingService.getBookingDetailsByID(bookingId);

        if(booking==null) {
            return null;
        }

        return booking;
    }
}
