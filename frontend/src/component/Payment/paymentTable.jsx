import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdatePayment from './updatePayment';
import '../../CSS/PaymentTable.css';
import Nav from '../Nav';

const PaymentTable = () => {
    const [payments, setPayments] = useState([]);
    const [selectedPaymentId, setSelectedPaymentId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const response = await axios.get('http://localhost:8097/api/payment', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPayments(response.data);
        } catch (error) {
            console.error('Error fetching payments:', error);
            setError('Failed to fetch payments.');
        }
    };

    const handleUpdate = (paymentId) => {
        setSelectedPaymentId(paymentId);
    };

    const closeUpdateForm = () => {
        setSelectedPaymentId(null);
    };

    return (
        <Nav>
        <div>
            <br />
            <h2>All Payments</h2><br />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Booking ID</th>
                        <th>Amount</th>
                        <th>Payment Date</th>
                        <th>Payment Method</th>
                        <th>Transaction ID</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(payment => (
                        <tr key={payment.payId}>
                            <td>{payment.payId}</td>
                            <td>{payment.bookingId}</td>
                            <td>{payment.userId}</td>
                            <td>{payment.amount}</td>
                            <td>{payment.payDate.split('T')[0]}</td>
                            <td>{payment.paymentMethod}</td>
                            <td>{payment.transactionId}</td>
                            <td>{payment.payStatus}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => handleUpdate(payment.payId)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedPaymentId && (
                <UpdatePayment paymentId={selectedPaymentId} onClose={closeUpdateForm} onUpdate={fetchPayments} />
            )}
        </div>
        </Nav>
    );
};

export default PaymentTable;