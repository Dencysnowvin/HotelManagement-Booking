package com.cts.paymentservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.times;
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

import com.cts.paymentservice.entity.Payment;
import com.cts.paymentservice.repo.PaymentRepository;
import com.cts.paymentservice.service.PaymentServiceImpl;

@SpringBootTest
class PaymentServiceApplicationTests {

	@Mock
    private PaymentRepository paymentRepository;

    @InjectMocks
    private PaymentServiceImpl paymentService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreatePayment() {
        Payment payment = new Payment();
        payment.setBookingId(1L);

        when(paymentRepository.findByBookingId(1L)).thenReturn(Optional.empty());
        when(paymentRepository.save(payment)).thenReturn(payment);

        Payment createdPayment = paymentService.createPayment(payment);

        assertNotNull(createdPayment);
        verify(paymentRepository, times(1)).save(payment);
    }

    @Test
    void testGetPaymentById() {
        Payment payment = new Payment();
        payment.setPayId(1L);

        when(paymentRepository.findById(1L)).thenReturn(Optional.of(payment));

        Optional<Payment> foundPayment = paymentService.getPaymentById(1L);

        assertTrue(foundPayment.isPresent());
        assertEquals(1L, foundPayment.get().getPayId());
    }

    @Test
    void testGetAllPayments() {
        Payment payment1 = new Payment();
        Payment payment2 = new Payment();

        when(paymentRepository.findAll()).thenReturn(Arrays.asList(payment1, payment2));

        List<Payment> payments = paymentService.getAllPayments();

        assertEquals(2, payments.size());
    }

    @Test
    void testUpdatePayment() {
        Payment payment = new Payment();
        payment.setPayId(1L);

        when(paymentRepository.existsById(1L)).thenReturn(true);
        when(paymentRepository.save(payment)).thenReturn(payment);

        Payment updatedPayment = paymentService.updatePayment(1L, payment);

        assertNotNull(updatedPayment);
        assertEquals(1L, updatedPayment.getPayId());
    }

    @Test
    void testDeletePayment() {
        when(paymentRepository.existsById(1L)).thenReturn(true);

        paymentService.deletePayment(1L);

        verify(paymentRepository, times(1)).deleteById(1L);
    }

    @Test
    void testGetPaymentsByUserId() {
        Payment payment1 = new Payment();
        payment1.setUserId(1L);
        Payment payment2 = new Payment();
        payment2.setUserId(1L);

        when(paymentRepository.findAll()).thenReturn(Arrays.asList(payment1, payment2));

        List<Payment> payments = paymentService.getPaymentsByUserId(1L);

        assertEquals(2, payments.size());
    }
}