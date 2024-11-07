
import '../styles/HomePage.css'; // Import the CSS file for styling
import '../styles/HomePage.css'; // Import the CSS file for styling
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function HomePage() {
  const [products, setProducts] = useState([]);

  // Fetch products when component mounts
  useEffect(() => {
    axios.get("http://localhost:8000/api/products/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="home">
      {/* Welcome Section with Background Image */}
      <div className="hero">
        <h1>Welcome to Anime Mart</h1>
        <p>Your one-stop shop for Anime Heros!</p>
        <Link to="/products" className="cta-btn">Browse Products</Link>
      </div>

    </div>
  );
}

export default HomePage;
