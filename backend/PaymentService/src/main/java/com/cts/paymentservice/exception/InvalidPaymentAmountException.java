package com.cts.paymentservice.exception;

public class InvalidPaymentAmountException extends RuntimeException {
	public InvalidPaymentAmountException(String message) {
        super(message);
       }
}
