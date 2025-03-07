package com.cts.bookingservice.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cts.bookingservice.exception.ResourceNotFoundException;
import com.cts.bookingservice.dto.BookingDTO;
import com.cts.bookingservice.entity.Booking;
import com.cts.bookingservice.repo.BookingRepository;
import com.cts.bookingservice.service.BookingService;

@Service
public class BookingServiceImpl implements BookingService {
 
    @Autowired
    private BookingRepository bookingRepository;
 
    @Override
    public BookingDTO createBooking(BookingDTO bookingDTO) {
        Booking booking = new Booking();
        booking.setUserId(bookingDTO.getUserId());
        booking.setHotelId(bookingDTO.getHotelId());
        booking.setRoomId(bookingDTO.getRoomId());
        booking.setBookingDate(bookingDTO.getBookingDate());
        booking.setStatus("Pending"); // Default status
 
        booking = bookingRepository.save(booking);
        return convertToDTO(booking);
    }
 
    @Override
    public BookingDTO getBookingById(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));
        return convertToDTO(booking);
    }
 
    @Override
    public List<BookingDTO> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId)
                .stream().map(this::convertToDTO).collect(Collectors.toList());
    }
 
    @Override
    public List<BookingDTO> getBookingsByHotelId(Long hotelId) {
        return bookingRepository.findByHotelId(hotelId)
                .stream().map(this::convertToDTO).collect(Collectors.toList());
    }
 
    @Override
    public List<BookingDTO> getBookingsByRoomId(Long roomId) {
        return bookingRepository.findByRoomId(roomId)
                .stream().map(this::convertToDTO).collect(Collectors.toList());
    }
 
    @Override
    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAll()
                .stream().map(this::convertToDTO).collect(Collectors.toList());
    }
 
    @Override
    public BookingDTO updateBookingStatus(Long bookingId, String status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));
 
        booking.setStatus(status);
        booking = bookingRepository.save(booking);
        return convertToDTO(booking);
    }
 
    @Override
    public void deleteBooking(Long bookingId) {
        if (!bookingRepository.existsById(bookingId)) {
            throw new ResourceNotFoundException("Booking not found with ID: " + bookingId);
        }
        bookingRepository.deleteById(bookingId);
    }
 
    private BookingDTO convertToDTO(Booking booking) {
        BookingDTO dto = new BookingDTO();
        dto.setBookingId(booking.getBookingId());
        dto.setUserId(booking.getUserId());
        dto.setHotelId(booking.getHotelId());
        dto.setRoomId(booking.getRoomId());
        dto.setBookingDate(booking.getBookingDate());
        dto.setStatus(booking.getStatus());
        return dto;
    }
}