package com.telsusko.ParcelMangementSpringBoot.Controller;

import com.telsusko.ParcelMangementSpringBoot.Service.PaymentService;
import com.telsusko.ParcelMangementSpringBoot.dto.PaymentRequest;
import com.telsusko.ParcelMangementSpringBoot.dto.PaymentResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PaymentController {

    private PaymentService paymentService;

    public PaymentController(PaymentService paymentService){
          this.paymentService=paymentService;
    }

    @PostMapping("/checkout")
    public ResponseEntity<PaymentResponse> checkoutParcel(@RequestBody PaymentRequest paymentRequest){
        PaymentResponse paymentResponse= paymentService.checkoutProducts(paymentRequest);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(paymentResponse);
    }
}
