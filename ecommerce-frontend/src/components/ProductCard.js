import React from 'react';
import '../styles/ProductCard.css';  // Import the CSS file for styling

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p className="price">${product.price}</p> {/* Add class for price styling */}
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
