package com.cts.bookingservice.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingDTO {
    private Long bookingId;
    private Long userId;
    private Long hotelId;
    private Long roomId;
    private LocalDate bookingDate;
    private String status; // Pending, Confirmed, Cancelled
	
}
