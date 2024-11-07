// import React, { useEffect, useState } from "react";
// import axios from "axios"; // Ensure axios is imported
// import { Link } from "react-router-dom";

// function ProductPage() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [cartMessage, setCartMessage] = useState(""); // State to display success or failure messages

//   const userToken = localStorage.getItem("token"); // Assuming you're storing the token in localStorage

//   // Fetch products when the component mounts
//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/api/products/") // Check if this is your correct API URL
//       .then((response) => {
//         setProducts(response.data); // Update state with the products data
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//         setError("Failed to load products.");
//         setLoading(false);
//       });
//   }, []);

//   // Add product to cart
//   const addToCart = (productId) => {
//     if (!userToken) {
//       setCartMessage("You need to be logged in to add items to the cart.");
//       return; // Prevent adding to cart if not logged in
//     }

//     axios
//       .post(
//         "http://localhost:8000/api/cart/", // API endpoint to add to the cart
//         { product_id: productId, quantity: 1 }, // You can adjust the quantity as needed
//         {
//           headers: {
//             Authorization: `Token ${userToken}`, // Include token in headers for authentication
//           },
//         }
//       )
//       .then((response) => {
//         setCartMessage("Product added to cart successfully!");
//       })
//       .catch((error) => {
//         console.error("Error adding to cart:", error);
//         setCartMessage("Failed to add product to cart.");
//       });
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Show loading message while fetching data
//   }

//   if (error) {
//     return <div>{error}</div>; // Show error if something went wrong
//   }

//   return (
//     <div className="product-page">
//       <h1>Our Products</h1>
//       {cartMessage && <p>{cartMessage}</p>} {/* Show cart message */}

//       <div className="product-list">
//         {products.length === 0 ? (
//           <p>No products available</p>
//         ) : (
//           products.map((product) => (
//             <div key={product.id} className="product-card">
//               <img src={product.image} alt={product.name} />
//               <h3>{product.name}</h3>
//               <p>{product.description}</p>
//               <p>${product.price}</p>
//               <button
//                 className="add-to-cart-btn"
//                 onClick={() => addToCart(product.id)} // Call the addToCart function when clicked
//               >
//                 Add to Cart
//               </button>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Link to CartPage */}
//       <Link to="/cart">
//         <button className="view-cart-btn">View Cart</button>
//       </Link>
//     </div>
//   );
// }

// export default ProductPage;
// import '../styles/ProductPage.css'; // Adjust this path if necessary
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function ProductPage() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [cartMessage, setCartMessage] = useState("");
//   const [filterType, setFilterType] = useState("all"); // To track selected filter
//   const [minPrice, setMinPrice] = useState(""); // To store minimum price
//   const userToken = localStorage.getItem("token");

//   // Fetch products based on the filter type
//   useEffect(() => {
//     fetchProducts(); // Initial fetch without filter
//   }, []);

//   const fetchProducts = () => {
//     setLoading(true);
//     let url = "http://localhost:8000/api/products/";

//     // Adjust the endpoint based on selected filter
//     if (filterType === "priceLowToHigh") {
//       url += "sort-price/";
//     } else if (filterType === "minPrice" && minPrice) {
//       url += `filter-price/?min_price=${minPrice}`;
//     }

//     axios
//       .get(url)
//       .then((response) => {
//         setProducts(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//         setError("Failed to load products.");
//         setLoading(false);
//       });
//   };

//   const addToCart = (productId) => {
//     if (!userToken) {
//       setCartMessage("You need to be logged in to add items to the cart.");
//       return;
//     }

//     axios
//       .post(
//         "http://localhost:8000/api/cart/",
//         { product_id: productId, quantity: 1 },
//         {
//           headers: {
//             Authorization: `Token ${userToken}`,
//           },
//         }
//       )
//       .then(() => {
//         setCartMessage("Product added to cart successfully!");
//       })
//       .catch((error) => {
//         console.error("Error adding to cart:", error);
//         setCartMessage("Failed to add product to cart.");
//       });
//   };

//   const handleFilterSubmit = () => {
//     fetchProducts(); // Fetch products based on selected filter when "Submit" is clicked
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="product-page">
//       <h1>Our Products</h1>
//       {cartMessage && <p>{cartMessage}</p>}

//       {/* Filter Options */}
//       <div className="filter-options">
//         <select
//           value={filterType}
//           onChange={(e) => setFilterType(e.target.value)}
//         >
//           <option value="all">All Products</option>
//           <option value="priceLowToHigh">Price: Low to High</option>
//           <option value="minPrice">Minimum Price</option>
//         </select>

//         {/* Minimum Price Input */}
//         {filterType === "minPrice" && (
//           <input
//             type="number"
//             value={minPrice}
//             onChange={(e) => setMinPrice(e.target.value)}
//             placeholder="Enter minimum price"
//           />
//         )}

//         {/* Submit Button */}
//         <button onClick={handleFilterSubmit}>Submit</button>
//       </div>

//       {/* Product List */}
//       <div className="product-list">
//         {products.length === 0 ? (
//           <p>No products available</p>
//         ) : (
//           products.map((product) => (
//             <div key={product.id} className="product-card">
//               <img src={product.image} alt={product.name} />
//               <h3>{product.name}</h3>
//               <p>{product.description}</p>
//               <p>${product.price}</p>
//               <button
//                 className="add-to-cart-btn"
//                 onClick={() => addToCart(product.id)}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           ))
//         )}
//       </div>

//       <Link to="/cart">
//         <button className="view-cart-btn">View Cart</button>
//       </Link>
//     </div>
//   );
// }

// export default ProductPage;


import '../styles/ProductPage.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartMessage, setCartMessage] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, [filterType, minPrice]);

  const fetchProducts = () => {
    setLoading(true);
    let url = "http://localhost:8000/api/products/";

    // Determine the URL based on the current filter type
    if (filterType === "priceLowToHigh") {
      url += "sort-price/";
    } else if (filterType === "minPrice" && minPrice) {
      url += `filter-price/?min_price=${minPrice}`;
    }

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
        setLoading(false);
      });
  };

  const addToCart = (productId) => {
    if (!userToken) {
      setCartMessage("You need to be logged in to add items to the cart.");
      return;
    }

    axios
      .post(
        "http://localhost:8000/api/cart/",
        { product_id: productId, quantity: 1 },
        {
          headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      )
      .then(() => {
        setCartMessage("Product added to cart successfully!");
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        setCartMessage("Failed to add product to cart.");
      });
  };

  // Handle filter type change
  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilterType(selectedFilter);

    // Clear minPrice if switching to a filter that doesn't use it
    if (selectedFilter !== "minPrice") {
      setMinPrice("");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="product-page">
      <h1>Our Products</h1>
      {cartMessage && <p>{cartMessage}</p>}

      {/* Filter Options */}
      <div className="filter-options">
        <select
          value={filterType}
          onChange={handleFilterChange}
          className="filter-dropdown"
        >
          <option value="all">All Products</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="minPrice">Minimum Price</option>
        </select>

        {/* Show minPrice input only if the selected filter is minPrice */}
        {filterType === "minPrice" && (
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onBlur={() => fetchProducts()}  // Fetch products when user finishes inputting min price
            placeholder="Enter minimum price"
            className="min-price-input"
          />
        )}
      </div>

      {/* Product List */}
      <div className="product-list">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>${product.price}</p>
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(product.id)}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>

      <Link to="/cart">
        <button className="view-cart-btn">View Cart</button>
      </Link>
    </div>
  );
}

export default ProductPage;


