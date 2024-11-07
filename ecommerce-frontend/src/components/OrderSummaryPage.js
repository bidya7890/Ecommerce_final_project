import React from "react";
import { useLocation } from "react-router-dom";

const OrderSummaryPage = () => {
  const location = useLocation();
  const { orderSummary } = location.state || {}; // Assuming we're passing state when navigating

  if (!orderSummary) {
    return <div>No order found.</div>;
  }

  return (
    <div>
      <h2>Order Summary</h2>
      <div>
        <h3>Items</h3>
        <ul>
          {orderSummary.items.map((item) => (
            <li key={item.id}>
              {item.product.name} - ${item.product.price} x {item.quantity}
            </li>
          ))}
        </ul>
        <div>Total Amount: ${orderSummary.totalAmount}</div>
        <div>Payment Method: {orderSummary.paymentMethod}</div>

        <h3>Shipping Details</h3>
        <div>Address: {orderSummary.shippingAddress}</div>
        <div>Phone Number: {orderSummary.phoneNumber}</div>
      </div>
    </div>
  );
};

export default OrderSummaryPage;
