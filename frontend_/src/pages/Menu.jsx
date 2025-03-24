import React from "react";
import Bottom from "../components/shared/bottom";
import BackButton from "../components/shared/BackButton";
import { BiRestaurant } from "react-icons/bi";
import MenuContainer from "../components/menu/MenuContainer";
import Bill from "../components/menu/Bill";
import CustomerInfo from "../components/menu/CustomerInfo";
import CartInfo from "../components/menu/CartInfo";
import { useSelector } from "react-redux";

const Menu = () => {
  const customerData = useSelector((state) => state.customer);

  return (
    <section className="bg-[#1f1f1f] min-h-screen lg:h-[calc(100vh-5rem)] overflow-hidden flex flex-col lg:flex-row gap-3">
      {/* Left div - Menu Section */}
      <div className="w-full lg:flex-[3] overflow-y-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-10 py-4">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <BackButton />
            <h1 className="text-[#f5f5f5] text-xl sm:text-2xl font-bold tracking-wider">
              Menu
            </h1>
          </div>
          <div className="flex items-center justify-around gap-4">
            <div className="flex items-center gap-3 cursor-pointer">
              <BiRestaurant className="text-[#f5f5f5] text-3xl sm:text-4xl" />
              <div className="flex flex-col items-start">
                <h1 className="text-sm sm:text-md text-[#f5f5f5] font-semibold">
                  {customerData.customerName || "Customer Name"}
                </h1>
                <p className="text-xs text-[#ababab] font-medium">
                  {customerData.tableNo || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <MenuContainer />
      </div>

      {/* Right div - Cart Section */}
      <div className="w-full lg:flex-[2] bg-[#1a1a1a] lg:mt-4 lg:mr-3 h-auto lg:h-[780px] rounded-lg pt-2 overflow-y-auto">
        <CustomerInfo />
        <hr className="border-[#2a2a2a] border-t-2" />
        <CartInfo />
        <hr className="border-[#2a2a2a] border-t-2" />
        <Bill />
      </div>
      <Bottom />
    </section>
  );
};

export default Menu;
