import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutPage = ({ cartItems, totalAmount }) => {
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orderSummary, setOrderSummary] = useState(null);
  const [error, setError] = useState(null); // Error state for handling errors
  const navigate = useNavigate();

  const userToken = localStorage.getItem("token"); // Get token from localStorage for auth

  const handleCheckout = () => {
    if (!address || !phoneNumber) {
      alert("Please provide both address and phone number.");
      return;
    }

    const orderData = {
      items: cartItems.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
      totalAmount,
      paymentMethod,
      shippingAddress: address,
      phoneNumber,
    };

    // Make API call to place the order
    axios
      .post("http://localhost:8000/api/orders/", orderData, {
        headers: { Authorization: `Token ${userToken}` }, // Authorization header with token
      })
      .then((response) => {
        setOrderSummary(response.data); // Store the response (order details)
        alert("Checkout successful! Your order has been placed.");
        navigate("/order-summary"); // Redirect to order summary page
      })
      .catch((error) => {
        console.error("Error placing the order:", error);
        if (error.response) {
          alert(`Error placing order: ${error.response.data.detail || "Unknown error"}`);
        } else {
          alert("Failed to place the order: " + (error.message || "Unknown error"));
        }
        setError("Failed to place the order.");
      });
  };

  return (
    <div>
      <h2>Checkout</h2>

      {/* Payment Method */}
      <h3>Choose Payment Method</h3>
      <div>
        <input
          type="radio"
          id="cash_on_delivery"
          name="paymentMethod"
          value="cash_on_delivery"
          checked={paymentMethod === "cash_on_delivery"}
          onChange={() => setPaymentMethod("cash_on_delivery")}
        />
        <label htmlFor="cash_on_delivery">Cash on Delivery</label>
      </div>

      {/* Shipping Information */}
      <h3>Shipping Details</h3>
      <div>
        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your shipping address"
          required
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
          required
        />
      </div>

      {/* Order Summary */}
      <div>
        <h3>Order Summary</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.product.name} - ${item.product.price} x {item.quantity}
            </li>
          ))}
        </ul>
        <div>Total Amount: ${totalAmount}</div>
        <div>Payment Method: {paymentMethod}</div>
      </div>

      {/* Checkout Button */}
      <button onClick={handleCheckout}>Confirm Order</button>

      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
    </div>
  );
};

export default CheckoutPage;
