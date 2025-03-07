package com.cts.hotel.services;

import java.util.List;

import com.cts.hotel.dto.HotelDTO;


public interface HotelService {
	
	
	    // Create
	    HotelDTO create(HotelDTO hotelDTO);

	    // Get single hotel by ID
	    HotelDTO get(String hotelId);

	    // Get all hotels
	    List<HotelDTO> getAll();
	

}
