package com.cts.paymentservice.dto;


import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class RoomDTO {

    
    private Long roomId;

   
    private String roomNo;

    
    private RoomType roomType; // Enum for room type

   
    private int maxOccupancy; // Maximum number of people
    
   
    private double price; // Price for the room 
}