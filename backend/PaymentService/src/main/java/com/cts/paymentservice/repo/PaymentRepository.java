package com.cts.paymentservice.repo;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cts.paymentservice.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
	Optional<Payment> findByTransactionId(String transactionId);
	Optional<Payment> findByBookingId(Long bookingId);
}