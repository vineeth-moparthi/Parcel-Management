package com.telsusko.ParcelMangementSpringBoot.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterationRequest {
    private String name;
    private String email;
    private String countryCode;
    private String mobile;
    private String address;
//    private String userId;
    private String password;
    private String confirmPassword;
}
