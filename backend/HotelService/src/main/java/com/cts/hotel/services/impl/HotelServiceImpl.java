package com.cts.hotel.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cts.hotel.dto.HotelDTO;
import com.cts.hotel.entities.Hotel;
import com.cts.hotel.exceptions.ResourceNotFoundException;
import com.cts.hotel.repositories.HotelRepository;
import com.cts.hotel.services.HotelService;
@Service
public class HotelServiceImpl implements HotelService {

    @Autowired
    private HotelRepository repository;

    @Override
    public HotelDTO create(HotelDTO hotelDTO) {
        // Convert DTO to entity
        Hotel hotel = new Hotel();
        hotel.setId(hotelDTO.getId());
        hotel.setName(hotelDTO.getName());
        hotel.setLocation(hotelDTO.getLocation());
        hotel.setAbout(hotelDTO.getAbout());

        // Save entity and convert back to DTO
        Hotel savedHotel = repository.save(hotel);
        return convertToDTO(savedHotel);
    }

    @Override
    public HotelDTO get(String hotelId) {
        Hotel hotel = repository.findById(hotelId).orElseThrow(() -> new ResourceNotFoundException("Hotel not found"));
        return convertToDTO(hotel);
    }

    @Override
    public List<HotelDTO> getAll() {
        return repository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    private HotelDTO convertToDTO(Hotel hotel) {
        HotelDTO hotelDTO = new HotelDTO();
        hotelDTO.setId(hotel.getId());
        hotelDTO.setName(hotel.getName());
        hotelDTO.setLocation(hotel.getLocation());
        hotelDTO.setAbout(hotel.getAbout());
        return hotelDTO;
    }
}