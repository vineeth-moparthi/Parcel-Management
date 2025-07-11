package com.telsusko.ParcelMangementSpringBoot.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

    private String name;

    private String email;

    private String countryCode;

    private String mobile;

    private String address;

    private String pincode;

    private String username;

    private String password;
}
