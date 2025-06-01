package com.telsusko.ParcelMangementSpringBoot.Controller;

import com.telsusko.ParcelMangementSpringBoot.Model.Booking;
import com.telsusko.ParcelMangementSpringBoot.Model.User;
import com.telsusko.ParcelMangementSpringBoot.Service.BookingService;
import com.telsusko.ParcelMangementSpringBoot.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
@RestController
@RequestMapping("/TrackingStatus")
public class TrackingController {
    @Autowired
    BookingService bookingService;

    @Autowired
    UserService userService;

    @GetMapping("/{bookingId}")
    public Map<Booking,User> getTrackingStatus(@PathVariable long bookingId)
    {
        Map<Booking,User> map=new HashMap<>();
        Booking booking=bookingService.getBookingDetailsByID(bookingId);
        if(booking==null) {
            return null;
        }

        User user=userService.getUserDetailsById(booking.getUserId());
        map.put(booking,user);
        return map;
    }
}
