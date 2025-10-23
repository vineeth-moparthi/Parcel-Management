package com.telsusko.ParcelMangementSpringBoot.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentResponse {
    private String status;
    private String message;
    private String sessionID;
    private String sessionUrl;
}