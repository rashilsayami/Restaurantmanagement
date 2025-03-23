import React, { useState, useCallback, useMemo } from "react";
import { menus } from "../../constants";
import { GrRadialSelected } from "react-icons/gr";
import { BsCartDashFill, BsCartPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity, removeFromCart } from "../../redux/slices/cartSlice";

const MenuContainer = () => {
  const [selected, setSelected] = useState(menus[0]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  // Create a unique ID by combining category and item IDs
  const createUniqueId = useCallback((categoryId, itemId) => {
    return `${categoryId}_${itemId}`;
  }, []);

  const getItemQuantity = useCallback(
    (categoryId, itemId) => {
      const uniqueId = createUniqueId(categoryId, itemId);
      const item = cartItems.find((item) => item.id === uniqueId);
      return item ? item.quantity : 0;
    },
    [cartItems, createUniqueId]
  );

  const handleQuantityChange = useCallback(
    (categoryId, item, change, e) => {
      e.stopPropagation(); // Prevent event bubbling
      const uniqueId = createUniqueId(categoryId, item.id);
      const currentQuantity = getItemQuantity(categoryId, item.id);
      const newQuantity = currentQuantity + change;

      if (newQuantity < 0 || newQuantity > 20) return;

      try {
        if (currentQuantity === 0 && change > 0) {
          dispatch(
            addToCart({
              id: uniqueId,
              categoryId: categoryId,
              itemId: item.id,
              name: item.name,
              price: item.price,
              quantity: 1,
            })
          );
        } else if (newQuantity === 0) {
          dispatch(removeFromCart(uniqueId));
        } else {
          dispatch(
            updateQuantity({
              id: uniqueId,
              quantity: newQuantity,
            })
          );
        }
      } catch (err) {
        setError("Failed to update cart. Please try again.");
        console.error("Cart update error:", err);
      }
    },
    [dispatch, getItemQuantity, createUniqueId]
  );

  const handleMenuSelect = useCallback((menu) => {
    setSelected(menu);
    setError(null);
  }, []);

  // Memoize filtered menu items
  const menuItems = useMemo(() => {
    if (!selected?.items) return [];
    return selected.items;
  }, [selected]);

  if (!menus || menus.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] text-[#ababab]">
        No menu items available
      </div>
    );
  }

  return (
    <div role="main" aria-label="Menu Selection" className="pb-20 lg:pb-4">
      {error && (
        <div className="bg-red-500/10 text-red-500 px-4 py-2 mb-4 rounded-lg mx-4 sm:mx-10">
          {error}
        </div>
      )}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 px-4 sm:px-10 py-4 w-full"
        role="tablist"
      >
        {menus.map((menu) => (
          <div
            key={menu.id}
            role="tab"
            aria-selected={selected.id === menu.id}
            aria-controls={`menu-items-${menu.id}`}
            className={`flex flex-col items-start justify-between p-3 sm:p-4 rounded-lg h-[90px] sm:h-[100px] cursor-pointer transition-all duration-200 ${
              selected.id === menu.id ? "ring-2 ring-[#f6B100]" : ""
            }`}
            style={{ backgroundColor: menu.bgColor }}
            onClick={() => handleMenuSelect(menu)}
          >
            <div className="flex items-center justify-between w-full">
              <h1 className="text-[#f5f5f5] text-base sm:text-lg font-semibold">
                {menu.icon} {menu.name}
              </h1>
              {selected.id === menu.id && (
                <GrRadialSelected
                  className="text-white"
                  size={16}
                  aria-hidden="true"
                />
              )}
            </div>
            <p className="text-[#ababab] text-xs sm:text-sm font-semibold">
              {menu.items.length} Items
            </p>
          </div>
        ))}
      </div>
      <hr className="border-[#2a2a2a] border-t-2 mt-4" role="separator" />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-10 py-4 w-full"
        role="tabpanel"
        id={`menu-items-${selected.id}`}
      >
        {menuItems.map((item) => {
          const quantity = getItemQuantity(selected.id, item.id);
          return (
            <div
              key={item.id}
              className="flex flex-col items-start justify-between p-4 rounded-lg h-[150px] bg-[#1a1a1a] transition-colors"
              role="article"
              aria-label={`${item.name} menu item`}
            >
              <div className="flex items-center justify-between w-full">
                <h2 className="text-[#f5f5f5] text-base sm:text-lg font-semibold">
                  {item.name}
                </h2>
                <button
                  onClick={(e) =>
                    quantity === 0 && handleQuantityChange(selected.id, item, 1, e)
                  }
                  className={`p-2 rounded-lg cursor-pointer transition-colors ${
                    quantity > 0
                      ? "bg-[#2e4a40] text-[#02ca3a]"
                      : "bg-[#f6B100] text-white hover:bg-[#e5a400]"
                  }`}
                  aria-label={
                    quantity > 0 ? "Item added to cart" : "Add item to cart"
                  }
                >
                  {quantity > 0 ? (
                    <BsCartDashFill size={18} />
                  ) : (
                    <BsCartPlusFill size={18} />
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between w-full">
                <p
                  className="text-[#f5f5f5] text-lg sm:text-xl font-bold"
                  aria-label={`Price: ${item.price} rupees`}
                >
                  Rs. {item.price.toLocaleString()}
                </p>
                {quantity > 0 && (
                  <div
                    className="flex items-center justify-between bg-[#1f1f1f] px-3 sm:px-4 py-2 rounded-lg gap-3 sm:gap-4"
                    role="group"
                    aria-label="Quantity controls"
                  >
                    <button
                      onClick={(e) => handleQuantityChange(selected.id, item, -1, e)}
                      className="text-[#f6B100] hover:text-[#e5a400] transition-colors w-6 h-6 flex items-center justify-center text-xl sm:text-2xl"
                      aria-label="Decrease quantity"
                    >
                      &minus;
                    </button>
                    <span
                      className="text-white w-4 text-center"
                      aria-label={`Quantity: ${quantity}`}
                    >
                      {quantity}
                    </span>
                    <button
                      onClick={(e) => handleQuantityChange(selected.id, item, 1, e)}
                      className="text-[#f6B100] hover:text-[#e5a400] transition-colors w-6 h-6 flex items-center justify-center text-xl sm:text-2xl"
                      aria-label="Increase quantity"
                      disabled={quantity >= 20}
                    >
                      &#43;
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </div>
    </div>
);
};

export default MenuContainer;
