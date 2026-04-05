import React from 'react';
import { useNavigate } from 'react-router-dom'; 
const OrderConfirmation = () => {
    const navigate = useNavigate(); 
    return (
        <div>
            <h1>Thank You for Your Order!</h1>
            <p>Your order has been successfully placed.</p>
            <button onClick={() => navigate('/')}>Go to Home</button>
        </div>
    );
};

export default OrderConfirmation;
