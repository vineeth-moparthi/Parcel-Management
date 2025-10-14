package com.telsusko.ParcelMangementSpringBoot.Model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "Booking")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bookingId;

    private long userId;
    private String senderEmail,senderName, senderMobile, senderAddress, senderPincode,recName, recEmail, recMobile, recAddress, recPincode;

    private Timestamp bookingDate;

    //Parcel Details
    private String description, deliveryType, packingPreference, status;
    private double weight, serviceCost;
    private Timestamp pickupTime, dropoffTime, paymentTime;
}
