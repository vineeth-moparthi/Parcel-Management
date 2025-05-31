package com.telsusko.ParcelMangementSpringBoot.Controller;

import com.telsusko.ParcelMangementSpringBoot.Model.Booking;
import com.telsusko.ParcelMangementSpringBoot.Service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/DeliveryStatus")
public class DeliveryStatusController {

    @Autowired
    BookingService bookingService;
    @PostMapping("/{booking}")
    public void updateStatus(@PathVariable Booking booking)
    {

    }

}
