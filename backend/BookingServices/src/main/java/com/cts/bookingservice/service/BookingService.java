package com.cts.bookingservice.service;


import java.util.List;

import com.cts.bookingservice.dto.BookingDTO;

public interface BookingService {
    BookingDTO createBooking(BookingDTO bookingDTO);
    BookingDTO getBookingById(Long bookingId);
     List<BookingDTO> getBookingsByUserId(Long userId);
    List<BookingDTO> getBookingsByHotelId(Long hotelId);
    List<BookingDTO> getBookingsByRoomId(Long roomId);
    List<BookingDTO> getAllBookings();
    BookingDTO updateBookingStatus(Long bookingId, String status);
    void deleteBooking(Long bookingId);
}
