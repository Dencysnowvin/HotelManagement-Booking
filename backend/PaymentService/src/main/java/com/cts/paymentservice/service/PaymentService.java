package com.cts.paymentservice.service;

import java.util.List;
import java.util.Optional;
import com.cts.paymentservice.entity.Payment;

public interface PaymentService {

	Payment createPayment(Payment payment);

	Optional<Payment> getPaymentById(Long payId);

	List<Payment> getAllPayments();

	Payment updatePayment(Long payId, Payment payment);

	void deletePayment(Long payId);

	public List<Payment> getPaymentsByUserId(Long userId);

}
