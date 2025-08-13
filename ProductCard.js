import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1); // Reset quantity after adding to cart
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  return (
    <div className="product-card">
      <img 
        src={imageError ? 'https://via.placeholder.com/300x200?text=Product+Image+Not+Available' : product.image} 
        alt={product.name} 
        className="product-image"
        onError={handleImageError} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price}</p>
        <div className="quantity-controls">
          <button onClick={decrementQuantity} className="quantity-btn">-</button>
          <span className="quantity">{quantity}</span>
          <button onClick={incrementQuantity} className="quantity-btn">+</button>
        </div>
        <button onClick={handleAddToCart} className="add-to-cart-button">
          Add to Cart ({quantity})
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
