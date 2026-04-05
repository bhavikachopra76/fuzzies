import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../api'; 
const PaymentPage = () => {
    const navigate = useNavigate();
    const [shippingAddress, setShippingAddress] = useState('');
    const [paymentProcessing, setPaymentProcessing] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));
    const email = user ? user.email : null;

    const handlePlaceOrder = async () => {
        try {
            setPaymentProcessing(true);
            const totalAmount = 200; // Replace with dynamic total amount
            const response = await api.post('/orders', {
                email,
                shippingAddress,
                totalAmount,
            });
            if (response.data.success) {
                alert('Order placed successfully!');
                navigate('/order-confirmation');
            } else {
                alert('Failed to place order.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Error occurred while placing order.');
        } finally {
            setPaymentProcessing(false);
        }
    };

    return (
        <div>
            <h1>Payment</h1>
            <label>
                Shipping Address:
                <input
                    type="text"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    required
                />
            </label>
            <button disabled={paymentProcessing} onClick={handlePlaceOrder}>
                {paymentProcessing ? 'Processing...' : 'Place Order'}
            </button>
        </div>
    );
};

export default PaymentPage;
