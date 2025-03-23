import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  resetCart,
  selectCartSubtotal,
  selectCartTax,
  selectCartTotal,
} from "../../redux/slices/cartSlice";
import { placeOrder } from "../../redux/slices/orderSlice";
import { toast } from "react-hot-toast";

const Bill = () => {
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const customerData = useSelector((state) => state.customer);
  const subtotal = useSelector(selectCartSubtotal);
  const tax = useSelector(selectCartTax);
  const total = useSelector(selectCartTotal);

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Please add items to cart before placing order");
      return;
    }

    try {
      setIsProcessing(true);

      const orderData = {
        items: cartItems,
        subtotal: subtotal,
        tax: tax,
        total: total,
        customerName: customerData.customerName,
        tableNo: customerData.tableNo,
        paymentMethod: selectedPayment,
        orderDate: new Date().toISOString(),
      };

      dispatch(placeOrder(orderData));
      dispatch(resetCart());
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error("Order placement error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="px-2 sm:px-4 py-2 mb-20 lg:mb-0">
      <div className="flex items-center justify-between px-2 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">
          Items({cartItems.length})
        </p>
        <h1 className="text-[#f5f5f5] text-xs sm:text-sm font-bold">
          Rs. {subtotal.toLocaleString()}
        </h1>
      </div>
      <div className="flex items-center justify-between px-2 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Tax(13%)</p>
        <h1 className="text-[#f5f5f5] text-xs sm:text-sm font-bold">
          Rs. {tax.toLocaleString()}
        </h1>
      </div>
      <div className="flex items-center justify-between px-2 mt-2 bg-[#1f1f1f] py-2 rounded-lg">
        <p className=" text-[#f5f5f5] text-xs sm:text-sm font-semibold mt-2">
          Total Amount with tax
        </p>
        <h1 className="text-[#f5f5f5] text-sm sm:text-base font-bold">
          Rs. {total.toLocaleString()}
        </h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 px-2 mt-4">
        <button
          onClick={() => handlePaymentSelect("cash")}
          className={`px-3 sm:px-4 py-2 sm:py-3 w-full rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
            selectedPayment === "cash"
              ? "bg-[#f6b100] text-[#f5f5f5]"
              : "bg-[#1f1f1f] text-[#ababab]"
          }`}
        >
          Cash
        </button>
        <button
          onClick={() => handlePaymentSelect("online")}
          className={`px-3 sm:px-4 py-2 sm:py-3 w-full rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
            selectedPayment === "online"
              ? "bg-[#f6b100] text-[#f5f5f5]"
              : "bg-[#1f1f1f] text-[#ababab]"
          }`}
        >
          Online
        </button>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 px-2 mt-4">
        <button
          className="bg-[#025cca] px-3 sm:px-4 py-2 sm:py-3 w-full rounded-lg text-[#f5f5f5] text-xs sm:text-sm font-semibold hover:bg-[#0246a3] transition-colors"
          onClick={() => {
            /* Add print functionality */
          }}
        >
          Print Receipt
        </button>
        <button
          onClick={handlePlaceOrder}
          disabled={isProcessing || cartItems.length === 0}
          className={`px-3 sm:px-4 py-2 sm:py-3 w-full rounded-lg text-[#f5f5f5] text-xs sm:text-sm font-semibold transition-colors ${
            isProcessing || cartItems.length === 0
              ? "bg-[#a3a3a3] cursor-not-allowed"
              : "bg-[#f6b100] hover:bg-[#e5a400]"
          }`}
        >
          {isProcessing ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Bill;
