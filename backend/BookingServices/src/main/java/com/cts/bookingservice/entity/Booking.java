package com.cts.bookingservice.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Data
@Table(name = "bookings")
public class Booking {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;
 
    @Column(nullable = false)
    private Long userId; // Reference to user
 
    @Column(nullable = false)
    private Long hotelId; // Reference to PG
 
    @Column(nullable = false)
    private Long roomId; // Reference to Room
 
    @Column(nullable = false)
    private LocalDate bookingDate;
 
 
    @Column(nullable = false)
    private String status; // Pending, Confirmed, Cancelled
}