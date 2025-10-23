package com.telsusko.ParcelMangementSpringBoot.Service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.telsusko.ParcelMangementSpringBoot.dto.PaymentRequest;
import com.telsusko.ParcelMangementSpringBoot.dto.PaymentResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
        @Value("${stripe.secretKey}")
        private String secretKey;
        public PaymentResponse checkoutProducts(PaymentRequest paymentRequest){
                Stripe.apiKey=secretKey;

                SessionCreateParams.LineItem.PriceData.ProductData parcelData= SessionCreateParams.LineItem.PriceData.ProductData.builder()
                        .setName(paymentRequest.getParcelName()).build();
                SessionCreateParams.LineItem.PriceData priceData=SessionCreateParams.LineItem.PriceData.builder()
                        .setCurrency(paymentRequest.getCurrency())
                        .setProductData(parcelData)
                        .setUnitAmount(paymentRequest.getAmount()).build();
                SessionCreateParams.LineItem lineItem=SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(priceData)
                        .build();

                SessionCreateParams params= SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setSuccessUrl("http://localhost:8080/success")
                        .setCancelUrl("http://localhost:8080/cancel")
                        .addLineItem(lineItem)
                        .build();

                Session session=null;

                try{
                        session=Session.create(params);
                } catch (StripeException e) {
                    throw new RuntimeException(e);
                }

                return PaymentResponse.builder()
                        .status("SUCCESS")
                        .message(("Payment session created"))
                        .sessionID(session.getId())
                        .sessionUrl(session.getUrl())
                        .build();
        }
}
