package com.cts.hotel;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import com.cts.hotel.dto.HotelDTO;
import com.cts.hotel.entities.Hotel;
import com.cts.hotel.exceptions.ResourceNotFoundException;
import com.cts.hotel.repositories.HotelRepository;
import com.cts.hotel.services.impl.HotelServiceImpl;

@SpringBootTest
class HotelServiceApplicationTests {

	//This test class covers the create, get, and getAll methods of your HotelServiceImpl class
	@Mock
    private HotelRepository repository;

    @InjectMocks
    private HotelServiceImpl service;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreate() {
        HotelDTO hotelDTO = new HotelDTO();
        hotelDTO.setId("1");
        hotelDTO.setName("Test Hotel");
        hotelDTO.setLocation("Test Location");
        hotelDTO.setAbout("Test About");

        Hotel hotel = new Hotel();
        hotel.setId("1");
        hotel.setName("Test Hotel");
        hotel.setLocation("Test Location");
        hotel.setAbout("Test About");

        when(repository.save(any(Hotel.class))).thenReturn(hotel);

        HotelDTO result = service.create(hotelDTO);

        assertNotNull(result);
        assertEquals("1", result.getId());
        assertEquals("Test Hotel", result.getName());
        assertEquals("Test Location", result.getLocation());
        assertEquals("Test About", result.getAbout());
    }

    @Test
    public void testGet() {
        Hotel hotel = new Hotel();
        hotel.setId("1");
        hotel.setName("Test Hotel");
        hotel.setLocation("Test Location");
        hotel.setAbout("Test About");

        when(repository.findById("1")).thenReturn(Optional.of(hotel));

        HotelDTO result = service.get("1");

        assertNotNull(result);
        assertEquals("1", result.getId());
        assertEquals("Test Hotel", result.getName());
        assertEquals("Test Location", result.getLocation());
        assertEquals("Test About", result.getAbout());
    }

    @Test
    public void testGet_NotFound() {
        when(repository.findById("1")).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            service.get("1");
        });
    }

    @Test
    public void testGetAll() {
        Hotel hotel1 = new Hotel();
        hotel1.setId("1");
        hotel1.setName("Test Hotel 1");
        hotel1.setLocation("Test Location 1");
        hotel1.setAbout("Test About 1");

        Hotel hotel2 = new Hotel();
        hotel2.setId("2");
        hotel2.setName("Test Hotel 2");
        hotel2.setLocation("Test Location 2");
        hotel2.setAbout("Test About 2");

        when(repository.findAll()).thenReturn(Arrays.asList(hotel1, hotel2));

        List<HotelDTO> result = service.getAll();

        assertNotNull(result);
        assertEquals(2, result.size());
    }
}
