package com.cts.paymentservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.cts.paymentservice.dto.RoomDTO;

@FeignClient(name = "HOTELSERVICE")
public interface RoomClient {
	

	    @GetMapping("/rooms/{id}")
	    RoomDTO getRoomById(@PathVariable Long id);
	}