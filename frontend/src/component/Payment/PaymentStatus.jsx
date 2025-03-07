import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Nav from "../Nav";
import "../../CSS/PaymentStatus.css";
import axiosInstance from "../axiosInstance";

const PaymentStatus = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPayments = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem("userToken");
                if (!token) {
                    setError("User token not found.");
                    return;
                }

                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userId;

                const response = await axiosInstance.get(`/api/payment/user/${userId}`);

                setPayments(response.data);
            } catch (err) {
                setError(err.message || "Failed to fetch payment history.");
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    if (loading) {
        return <Nav><div className="loading-spinner"></div></Nav>;
    }

    if (error) {
        return (
            <Nav>
                <div className="error-message">{error}</div>
            </Nav>
        );
    }

    return (
        <Nav>
            <div className="container payment-status-container">
                <h2 className="text-center mb-4">Payment History</h2>

                {payments && payments.length === 0 ? (
                    <p className="empty-message">No payment history available.</p>
                ) : (
                    <div className="row">
                        {payments.map((payment) => (
                            <div key={payment.payId} className="col-md-4 mb-4">
                                <div className="card shadow-sm h-100 payment-card">
                                    <div className="card-body payment-card-body">
                                        <h5 className="card-title fw-bold payment-card-title">Payment ID: {payment.payId}</h5>
                                        <p className="card-text payment-card-text">Booking ID: {payment.bookingId}</p>
                                        <p className="card-text payment-card-text">Amount: ${payment.amount}</p>
                                        <p className="card-text payment-card-text">Payment Date: {payment.payDate}</p>
                                        <p className="card-text payment-card-text">Payment Method: {payment.paymentMethod}</p>
                                        <p className="card-text payment-card-text">Transaction ID: {payment.transactionId}</p>
                                        <p className="card-text payment-card-text">Payment Status: {payment.payStatus}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Nav>
    );
};

export default PaymentStatus;