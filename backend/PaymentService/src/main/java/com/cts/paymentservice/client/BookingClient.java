package com.cts.paymentservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.cts.paymentservice.dto.BookingDTO;

@FeignClient(name = "BOOKINGSERVICES")
public interface BookingClient {

    @GetMapping("/bookings/{id}")
    BookingDTO getBookingById(@PathVariable Long id);
}
