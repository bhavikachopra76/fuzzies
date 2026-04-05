import React from 'react';
import './cartcard.css';

const CartCard = ({ item, removeFromCart, updateCartQuantity }) => {
    // Safeguard to handle incomplete item data gracefully
    if (!item || !item.productId) {
        return null; // Do not render anything if the item is invalid
    }

    const { productId, quantity } = item;
    const { name, description, price, rating, images } = productId;

    const handleIncrease = () => {
        updateCartQuantity(productId._id, quantity + 1); // Increase quantity
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            updateCartQuantity(productId._id, quantity - 1); // Decrease quantity
        } else {
            removeFromCart(productId._id); // Remove item if quantity reaches 0
        }
    };

    return (
        <div className="cart-card">
            <div className='product-image-name'>
                <img src={images[0]} alt={name} className="cart-card-img" />
                <div>
                    <h3>{name}</h3>
                    <p>{description}</p>
                </div>
            </div>
            <div className="cart-card-details">
                <div className='cart-p'>
                    <p><strong>Quantity:</strong> {quantity}</p>
                    <p><strong>Price:</strong> ${price.toFixed(2)}</p>
                    <p><strong>Rating:</strong> {rating}</p>
                </div>
            </div>
            <div className='cart-btns'>
                <div className="quantity-controls">
                    <button onClick={handleDecrease}>-</button>
                    <button onClick={handleIncrease}>+</button>
                </div>
                <button className="remove-button" onClick={() => removeFromCart(productId._id)}>
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartCard;