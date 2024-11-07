// import React, { useState, useEffect } from "react";
// import '../styles/CartPage.css';  // Navigate one level up from components to styles
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function CartPage() {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [isCheckout, setIsCheckout] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
//   const [orderSummary, setOrderSummary] = useState(null);

//   const userToken = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!userToken) {
//       setError("You must be logged in to view your cart.");
//       setLoading(false);
//       return;
//     }

//     axios
//       .get("http://localhost:8000/api/cart/", {
//         headers: { Authorization: `Token ${userToken}` },
//       })
//       .then((response) => {
//         setCartItems(response.data);
//         setLoading(false);

//         const total = response.data.reduce(
//           (acc, item) => acc + item.product.price * item.quantity,
//           0
//         );
//         setTotalPrice(total);
//       })
//       .catch((error) => {
//         setError("Failed to load cart items.");
//         setLoading(false);
//       });
//   }, [userToken]);

//   const handleRemoveItem = (itemId) => {
//     setCartItems(cartItems.filter((item) => item.id !== itemId));
//   };

//   const handleUpdateQuantity = (itemId, newQuantity) => {
//     const updatedCart = cartItems.map((item) =>
//       item.id === itemId ? { ...item, quantity: newQuantity } : item
//     );
//     setCartItems(updatedCart);
//   };

//   const handleProceedToCheckout = () => {
//     // Mock placing an order (you can replace this with API request if needed)
//     const orderData = {
//       payment_method: paymentMethod,
//       items: cartItems,
//       total_amount: totalPrice,
//     };

//     // Simulating order placement success
//     setOrderSummary({
//       id: Math.floor(Math.random() * 1000), // Mock Order ID
//       total_amount: totalPrice,
//       payment_method: paymentMethod,
//     });

//     // Clear the cart after successful order
//     setCartItems([]);

//     // Show success message
//     alert(`Order placed successfully with payment method: ${paymentMethod}`);
//     setIsCheckout(true);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="cart-page">
//       <h1>Your Cart</h1>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div>
//           <div className="cart-items">
//             {cartItems.map((item) => (
//               <div key={item.id} className="cart-item">
//                 <img src={item.product.image} alt={item.product.name} />
//                 <div className="item-details">
//                   <h3>{item.product.name}</h3>
//                   <p>${item.product.price}</p>
//                   <div>
//                     <label>Quantity:</label>
//                     <input
//                       type="number"
//                       value={item.quantity}
//                       min="1"
//                       onChange={(e) =>
//                         handleUpdateQuantity(item.id, e.target.value)
//                       }
//                     />
//                   </div>
//                   <button onClick={() => handleRemoveItem(item.id)}>
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           {!isCheckout ? (
//             <div className="cart-summary">
//               <p>Total Price: ${totalPrice.toFixed(2)}</p>
//               <button
//                 className="checkout-btn"
//                 onClick={handleProceedToCheckout}
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           ) : (
//             <div className="order-summary">
//               <h2>Order Summary</h2>
//               <p><strong>Order ID:</strong> {orderSummary.id}</p>
//               <p><strong>Total Amount:</strong> ${orderSummary.total_amount}</p>
//               <p><strong>Payment Method:</strong> {orderSummary.payment_method}</p>
//               <p>Order placed successfully!</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default CartPage;


// import React, { useState, useEffect } from "react";
// import '../styles/CartPage.css';
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function CartPage() {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [isCheckout, setIsCheckout] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
//   const [orderSummary, setOrderSummary] = useState(null);

//   const userToken = localStorage.getItem("token");
//   const navigate = useNavigate();

//   // Fetch cart data for the authenticated user
//   useEffect(() => {
//     if (!userToken) {
//       setError("You must be logged in to view your cart.");
//       setLoading(false);
//       return;
//     }

//     axios
//       .get("http://localhost:8000/api/cart/", {
//         headers: { Authorization: `Token ${userToken}` },
//       })
//       .then((response) => {
//         setCartItems(response.data);
//         setLoading(false);

//         // Calculate total price
//         const total = response.data.reduce(
//           (acc, item) => acc + item.product.price * item.quantity,
//           0
//         );
//         setTotalPrice(total);
//       })
//       .catch((error) => {
//         setError("Failed to load cart items.");
//         setLoading(false);
//       });
//   }, [userToken]);

//   const handleRemoveItem = (itemId) => {
//     // Send a DELETE request to the backend to remove the item
//     axios
//       .delete(`http://localhost:8000/api/cart/${itemId}/`, {
//         headers: { Authorization: `Token ${userToken}` },
//       })
//       .then(() => {
//         // If successful, remove the item from the frontend state
//         const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
//         setCartItems(updatedCartItems);

//         // Recalculate the total price after removing the item
//         const updatedTotal = updatedCartItems.reduce(
//           (acc, item) => acc + item.product.price * item.quantity,
//           0
//         );
//         setTotalPrice(updatedTotal);
//       })
//       .catch((error) => {
//         console.error("Failed to remove item:", error);
//         setError("Failed to remove item. Please try again.");
//       });
//   };

//   const handleUpdateQuantity = (itemId, newQuantity) => {
//     const updatedCart = cartItems.map((item) =>
//       item.id === itemId ? { ...item, quantity: newQuantity } : item
//     );
//     setCartItems(updatedCart);
//   };

//   const handleProceedToCheckout = () => {
//     // Mock placing an order (you can replace this with API request if needed)
//     const orderData = {
//       payment_method: paymentMethod,
//       items: cartItems,
//       total_amount: totalPrice,
//     };

//     // Simulating order placement success
//     setOrderSummary({
//       id: Math.floor(Math.random() * 1000), // Mock Order ID
//       total_amount: totalPrice,
//       payment_method: paymentMethod,
//     });

//     // Clear the cart after successful order
//     setCartItems([]);

//     // Show success message
//     alert(`Order placed successfully with payment method: ${paymentMethod}`);
//     setIsCheckout(true);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="cart-page">
//       <h1>Your Cart</h1>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div>
//           <div className="cart-items">
//             {cartItems.map((item) => (
//               <div key={item.id} className="cart-item">
//                 <img src={item.product.image} alt={item.product.name} />
//                 <div className="item-details">
//                   <h3>{item.product.name}</h3>
//                   <p>${item.product.price}</p>
//                   <div>
//                     <label>Quantity:</label>
//                     <input
//                       type="number"
//                       value={item.quantity}
//                       min="1"
//                       onChange={(e) =>
//                         handleUpdateQuantity(item.id, Number(e.target.value))
//                       }
//                     />
//                   </div>
//                   <button onClick={() => handleRemoveItem(item.id)}>
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           {!isCheckout ? (
//             <div className="cart-summary">
//               <p>Total Price: ${totalPrice.toFixed(2)}</p>
//               <button
//                 className="checkout-btn"
//                 onClick={handleProceedToCheckout}
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           ) : (
//             <div className="order-summary">
//               <h2>Order Summary</h2>
//               <p><strong>Order ID:</strong> {orderSummary.id}</p>
//               <p><strong>Total Amount:</strong> ${orderSummary.total_amount}</p>
//               <p><strong>Payment Method:</strong> {orderSummary.payment_method}</p>
//               <p>Order placed successfully!</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default CartPage;

import React, { useState, useEffect } from "react";
import '../styles/CartPage.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCheckout, setIsCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [orderSummary, setOrderSummary] = useState(null);

  const userToken = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch cart data for the authenticated user
  useEffect(() => {
    if (!userToken) {
      setError("You must be logged in to view your cart.");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:8000/api/cart/", {
        headers: { Authorization: `Token ${userToken}` },
      })
      .then((response) => {
        setCartItems(response.data);
        setLoading(false);

        // Calculate total price
        const total = response.data.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        );
        setTotalPrice(total);
      })
      .catch((error) => {
        setError("Failed to load cart items.");
        setLoading(false);
      });
  }, [userToken]);

  const handleRemoveItem = (itemId) => {
    // Send a DELETE request to the backend to remove the item
    axios
      .delete(`http://localhost:8000/api/cart/${itemId}/`, {
        headers: { Authorization: `Token ${userToken}` },
      })
      .then(() => {
        // If successful, remove the item from the frontend state
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCartItems);

        // Recalculate the total price after removing the item
        const updatedTotal = updatedCartItems.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        );
        setTotalPrice(updatedTotal);
      })
      .catch((error) => {
        console.error("Failed to remove item:", error);
        setError("Failed to remove item. Please try again.");
      });
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
  };

  const handleProceedToCheckout = () => {
    // Prepare a string listing all the products currently in the cart
    const productList = cartItems
      .map((item) => `${item.product.name} (x${item.quantity}) - $${(item.product.price * item.quantity).toFixed(2)}`)
      .join("\n");

    // Show an alert with the products and total price
    const alertMessage = `
      You are about to purchase the following items:
      ${productList}

      Do you wish to proceed with the checkout?
    `;

    // Show the alert to the user
    const confirmCheckout = window.confirm(alertMessage);

    if (confirmCheckout) {
      // Proceed to remove items from the cart in the backend
      const removePromises = cartItems.map((item) =>
        axios.delete(`http://localhost:8000/api/cart/${item.id}/`, {
          headers: { Authorization: `Token ${userToken}` },
        })
      );

      // Wait for all DELETE requests to finish
      Promise.all(removePromises)
        .then(() => {
          // After removing items from the backend, clear the cart in the frontend
          setCartItems([]);
          // Update the order summary
          setOrderSummary({
            id: Math.floor(Math.random() * 1000), // Mock Order ID
            total_amount: totalPrice,
            payment_method: paymentMethod,
          });
          // Show success message
          alert(`Order placed successfully with payment method: ${paymentMethod}`);
          setIsCheckout(true);
        })
        .catch((error) => {
          console.error("Error removing items from cart:", error);
          alert("Failed to remove items from the cart. Please try again.");
        });
    } else {
      // If the user cancels the checkout
      alert("Checkout cancelled. Your cart remains unchanged.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.product.image} alt={item.product.name} />
                <div className="item-details">
                  <h3>{item.product.name}</h3>
                  <p>${item.product.price}</p>
                  <div>
                    <label>Quantity:</label>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        handleUpdateQuantity(item.id, Number(e.target.value))
                      }
                    />
                  </div>
                  <button onClick={() => handleRemoveItem(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          {!isCheckout ? (
            <div className="cart-summary">
              <p>Total Price: ${totalPrice.toFixed(2)}</p>
              <button
                className="checkout-btn"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          ) : (
            <div className="order-summary">
              <h2>Order Summary</h2>
              <p><strong>Order ID:</strong> {orderSummary.id}</p>
              <p><strong>Total Amount:</strong> ${orderSummary.total_amount}</p>
              <p><strong>Payment Method:</strong> {orderSummary.payment_method}</p>
              <p>Order placed successfully!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CartPage;



