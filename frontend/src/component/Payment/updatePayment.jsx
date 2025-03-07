import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';

const UpdatePayment = ({ paymentId, onClose, onUpdate }) => {
    const [payment, setPayment] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayment = async () => {
            try {
                
                const response = await axiosInstance.get(`/api/payment/${paymentId}`);
                setPayment(response.data);
            } catch (err) {
                console.error('Error fetching payment:', err);
                setError('Failed to fetch payment details.');
            } finally {
                setLoading(false);
            }
        };

        fetchPayment();
    }, [paymentId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayment(prevPayment => ({
            ...prevPayment,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            await axiosInstance.put(`/api/payment/${paymentId}`,payment);
            onUpdate();
            onClose();
        } catch (err) {
            console.error('Error updating payment:', err);
            setError('Failed to update payment.');
        }
    };

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>;
    }

    if (error) {
        return <div className="alert alert-danger" role="alert">{error}</div>;
    }

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update Payment</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="bookingId" className="form-label">Booking ID:</label>
                                <input type="text" id="bookingId" name="bookingId" value={payment.bookingId} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="amount" className="form-label">Amount:</label>
                                <input type="number" id="amount" name="amount" value={payment.amount} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="payDate" className="form-label">Payment Date:</label>
                                <input type="date" id="payDate" name="payDate" value={payment.payDate.split('T')[0]} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="paymentMethod" className="form-label">Payment Method:</label>
                                <input type="text" id="paymentMethod" name="paymentMethod" value={payment.paymentMethod} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="transactionId" className="form-label">Transaction ID:</label>
                                <input type="text" id="transactionId" name="transactionId" value={payment.transactionId} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="payStatus" className="form-label">Payment Status:</label>
                                <select id="payStatus" name="payStatus" value={payment.payStatus} onChange={handleChange} className="form-select">
                                    <option value="PENDING">PENDING</option>
                                    <option value="COMPLETED">COMPLETED</option>
                                    <option value="FAILED">FAILED</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-info me-2">Update Payment</button>
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePayment;