package com.cts.bookingservice;
//
//import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertNotNull;
//import static org.junit.jupiter.api.Assertions.assertThrows;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.doNothing;
//import static org.mockito.Mockito.when;
//
//import java.time.LocalDate;
//import java.util.Optional;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
//
//import com.cts.bookingservice.dto.BookingDTO;
//import com.cts.bookingservice.entity.Booking;
//import com.cts.bookingservice.exception.ResourceNotFoundException;
//import com.cts.bookingservice.repo.BookingRepository;
//import com.cts.bookingservice.service.impl.BookingServiceImpl;
//
@SpringBootTest
class BookingServicesApplicationTests {

}
//
//    @Mock
//    private BookingRepository bookingRepository;
// 
//    @InjectMocks
//    private BookingServiceImpl bookingService;
// 
//    private Booking booking;
//    private BookingDTO bookingDTO;
// 
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
// 
//        booking = new Booking();
//        booking.setBookingId(1L);
//        booking.setUserId(100L);
//        booking.setHotelId(200L);
//        booking.setRoomId(300L);
//        booking.setBookingDate(LocalDate.now());
//        booking.setStatus("Pending");
// 
//        bookingDTO = new BookingDTO();
//        bookingDTO.setUserId(100L);
//        bookingDTO.setHotelId(200L);
//        bookingDTO.setRoomId(300L);
//        bookingDTO.setBookingDate(LocalDate.now());
//        bookingDTO.setStatus("Pending");
//    }
// 
//    @Test
//    void testCreateBooking() {
//        when(bookingRepository.save(any(Booking.class))).thenReturn(booking);
// 
//        BookingDTO savedBooking = bookingService.createBooking(bookingDTO);
// 
//        assertNotNull(savedBooking);
//        assertEquals(booking.getUserId(), savedBooking.getUserId());
//    }
// 
//    @Test
//    void testGetBookingById() {
//        when(bookingRepository.findById(1L)).thenReturn(Optional.of(booking));
// 
//        BookingDTO foundBooking = bookingService.getBookingById(1L);
// 
//        assertNotNull(foundBooking);
//        assertEquals(booking.getBookingId(), foundBooking.getBookingId());
//    }
// 
//    @Test
//    void testGetBookingById_NotFound() {
//        when(bookingRepository.findById(1L)).thenReturn(Optional.empty());
// 
//        Exception exception = assertThrows(ResourceNotFoundException.class, () -> {
//            bookingService.getBookingById(1L);
//        });
// 
//        assertEquals("Booking not found with ID: 1", exception.getMessage());
//    }
// 
//    @Test
//    void testUpdateBookingStatus() {
//        when(bookingRepository.findById(1L)).thenReturn(Optional.of(booking));
//        when(bookingRepository.save(any(Booking.class))).thenReturn(booking);
// 
//        BookingDTO updatedBooking = bookingService.updateBookingStatus(1L, "Confirmed");
// 
//        assertEquals("Confirmed", updatedBooking.getStatus());
//    }
// 
//    @Test
//    void testDeleteBooking() {
//        when(bookingRepository.existsById(1L)).thenReturn(true);
//        doNothing().when(bookingRepository).deleteById(1L);
// 
//        assertDoesNotThrow(() -> bookingService.deleteBooking(1L));
//    }
// 
//    @Test
//    void testDeleteBooking_NotFound() {
//        when(bookingRepository.existsById(1L)).thenReturn(false);
// 
//        Exception exception = assertThrows(ResourceNotFoundException.class, () -> {
//            bookingService.deleteBooking(1L);
//        });
// 
//        assertEquals("Booking not found with ID: 1", exception.getMessage());
//    }
//}
