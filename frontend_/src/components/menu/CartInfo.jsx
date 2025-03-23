import React, { useRef, useEffect } from "react";
import { FaNotesMedical } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, selectCartTotal } from "../../redux/slices/cartSlice";

const CartInfo = () => {
  const cartData = useSelector((state) => state.cart);
  const cartTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current && cartData.length > 0) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [cartData]);

  const handleDelete = (uniqueId) => {
    dispatch(removeFromCart(uniqueId));
  };

  return (
    <div className="px-2 sm:px-4 py-2">
      <h1 className="text-base sm:text-lg text-[#e4e4e4] font-semibold tracking-wide">
        Order details
      </h1>
      <div
        ref={scrollRef}
        className="mt-4 overflow-y-auto max-h-[250px] sm:max-h-[380px] scrollbar-hide"
      >
        {cartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[200px] sm:h-[300px] text-[#ababab]">
            <p className="text-sm text-[#ababab] flex justify-center items-center">
              Your cart is empty
            </p>
            <p className="text-xs mt-2 text-[#ababab] flex justify-center items-center">
              Add items from the menu to get started
            </p>
          </div>
        ) : (
          <>
            {cartData.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between px-2 py-2 border-b border-[#2a2a2a] hover:bg-[#1f1f1f] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FaNotesMedical className="text-[#f5f5f5] text-base sm:text-lg" />
                  <div>
                    <h1 className="text-[#f5f5f5] text-xs sm:text-sm">
                      {item.name}
                    </h1>
                    <p className="text-[#ababab] text-xs">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-[#f5f5f5] text-xs sm:text-sm">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </h1>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-[#f5f5f5] hover:text-red-500 transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <RiDeleteBin2Fill className="text-base sm:text-lg" />
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4 px-2 py-3 bg-[#1f1f1f] rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-[#f5f5f5] text-xs sm:text-sm font-medium">
                  Total Amount
                </span>
                <span className="text-[#f5f5f5] text-xs sm:text-sm font-bold">
                  Rs. {cartTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartInfo;
