package com.cts.paymentservice.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cts.paymentservice.entity.Payment;
import com.cts.paymentservice.exception.ResourceNotFoundException;
import com.cts.paymentservice.repo.PaymentRepository;

@Service
public class PaymentServiceImpl implements PaymentService {
	@Autowired
    private PaymentRepository paymentRepository;

    @Override
    public Payment createPayment(Payment payment) {
        Optional<Payment> existingPayment = paymentRepository.findByBookingId(payment.getBookingId());
        if (existingPayment.isPresent()) {
            throw new RuntimeException("Payment already exists for booking ID: " + payment.getBookingId());
        }
        return paymentRepository.save(payment);
    }

    @Override
    public Optional<Payment> getPaymentById(Long payId) {
        return paymentRepository.findById(payId);
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public Payment updatePayment(Long payId, Payment payment) {
        if (paymentRepository.existsById(payId)) {
            payment.setPayId(payId);
            return paymentRepository.save(payment);
        } else {
            throw new ResourceNotFoundException("Payment not found with id " + payId);
        }
    }

    @Override
    public void deletePayment(Long payId) {
        if (paymentRepository.existsById(payId)) {
            paymentRepository.deleteById(payId);
        } else {
            throw new ResourceNotFoundException("Payment not found with id " + payId);
        }
    }
    @Override
    public List<Payment> getPaymentsByUserId(Long userId) {
        return paymentRepository.findAll().stream()
                .filter(payment -> payment.getUserId().equals(userId))
                .collect(Collectors.toList());
    }
}