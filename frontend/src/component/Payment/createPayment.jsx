import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from '../Nav';
import '../../CSS/CreatePayment.css';
import { jwtDecode } from 'jwt-decode'; 
import axiosInstance from '../axiosInstance';

const CreatePayment = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const bookingId = searchParams.get('bookingId');
    const navigate = useNavigate();

    const [payment, setPayment] = useState({
        bookingId: bookingId,
        amount: 0,
        payDate: new Date().toISOString().split('T')[0],
        paymentMethod: '',
        transactionId: '',
        payStatus: 'PENDING',
        userId: null, 
    });

    const [bookingAmount, setBookingAmount] = useState(0);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [paymentCreated, setPaymentCreated] = useState(false);

    const fetchBookingAmount = useCallback(async (bookingId) => {
        try {
            
            const response = await axiosInstance.get(`/api/bookings/${bookingId}`);

            if (response.data) {
                setBookingAmount(response.data.price);
                setPayment(prevPayment => ({ ...prevPayment, amount: response.data.price }));
            }
        } catch (err) {
            console.error('Error fetching booking amount:', err);
            setError('Failed to fetch booking amount.');
        }
    }, [setBookingAmount, setPayment, setError]);

    useEffect(() => {
        if (bookingId) {
            fetchBookingAmount(bookingId);
        }

        // Getting userId from token and update the state
        const token = localStorage.getItem('userToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            setPayment(prevPayment => ({ ...prevPayment, userId: decodedToken.userId }));
        }
    }, [bookingId, fetchBookingAmount]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayment(prevPayment => ({
            ...prevPayment,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            
            await axiosInstance.post('/api/payment', payment);

            setSuccess(true);
            setPaymentCreated(true);
            alert("Payment created successfully!");
            navigate('/layout');
        } catch (err) {
            console.error('Error creating payment:', err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Failed to create payment. Please check your details.');
            }
        }
    };

    return (
        <Nav>
            <div className="create-payment-container">
                <div className="payment-card">
                    <h2>Create Payment</h2>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">Payment created successfully!</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="bookingId">Booking ID:</label>
                            <input type="text" id="bookingId" name="bookingId" value={payment.bookingId} readOnly className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount">Amount:</label>
                            <input type="number" id="amount" name="amount" value={bookingAmount} readOnly className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="payDate">Payment Date:</label>
                            <input type="date" id="payDate" name="payDate" value={payment.payDate} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="paymentMethod">Payment Method:</label>
                            <select
                                id="paymentMethod"
                                name="paymentMethod"
                                value={payment.paymentMethod}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value="">Select Method</option>
                                <option value="Credit Card">Credit Card</option>
                                <option value="PayPal">PayPal</option>
                                <option value="Debit Card">Debit Card</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="transactionId">Transaction ID:</label>
                            <input
                                type="text"
                                id="transactionId"
                                name="transactionId"
                                value={payment.transactionId}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={paymentCreated}>
                            Create Payment
                        </button>
                    </form>
                </div>
            </div>
        </Nav>
    );
};

export default CreatePayment;