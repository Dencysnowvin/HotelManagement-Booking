package com.cts.paymentservice.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDTO {

	private Long bookingId;

	private Long roomId;

	private Long guestId;

	private LocalDate checkInDate;

	private LocalDate checkOutDate;
	
	 private double price;

}
