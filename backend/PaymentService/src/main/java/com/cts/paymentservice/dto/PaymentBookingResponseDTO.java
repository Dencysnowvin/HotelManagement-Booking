package com.cts.paymentservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentBookingResponseDTO {
	private Long paymentId;
    private BookingDTO bookingDetails;
    
}
