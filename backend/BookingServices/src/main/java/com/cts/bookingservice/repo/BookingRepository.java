package com.cts.bookingservice.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cts.bookingservice.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
	
    List<Booking> findByUserId(Long userId);
    List<Booking> findByHotelId(Long hotelId);
    List<Booking> findByRoomId(Long roomId);
}