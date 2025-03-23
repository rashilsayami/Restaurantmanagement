import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { GrOrderedList } from "react-icons/gr";
import { MdOutlineTableRestaurant, MdOutlineInventory } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { CgMoreVerticalO } from "react-icons/cg";
import { BiSolidDish } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCustomer } from "../../redux/slices/CustomerSlice";
import Modal from "./Modal";

const Bottom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setGuestCount(0);
    setName("");
    setPhone("");
  };

  const increment = () => {
    if (guestCount >= 6) return;
    setGuestCount((prev) => prev + 1);
  };

  const decrement = () => {
    if (guestCount <= 0) return;
    setGuestCount((prev) => prev - 1);
  };

  const isActive = (path) => location.pathname === path;

  const handleCreateOrder = () => {
    if (!name.trim() || !phone.trim() || guestCount === 0) return;
    // send data to store
    dispatch(setCustomer({ name, phone, guests: guestCount }));
    closeModal();
    navigate("/tables");
  };

  const commonButtonClasses = (path) => `
    flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors
    ${
      isActive(path)
        ? "text-[#f5f5f5] bg-[#343434]"
        : "text-[#ababab] hover:bg-[#343434] hover:text-[#f5f5f5]"
    }
  `;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#262626] px-4 py-2 h-16 flex items-center justify-between">
      <button
        onClick={() => navigate("/")}
        className={commonButtonClasses("/")}
      >
        <FaHome size={20} />
        <span>Home</span>
      </button>

      <button
        onClick={() => navigate("/orders")}
        className={commonButtonClasses("/orders")}
      >
        <GrOrderedList size={20} />
        <span>Orders</span>
      </button>

      <button
        onClick={() => navigate("/tables")}
        className={commonButtonClasses("/tables")}
      >
        <MdOutlineTableRestaurant size={20} />
        <span>Tables</span>
      </button>

      <button
        onClick={() => navigate("/more")}
        className={commonButtonClasses("/more")}
      >
        <CgMoreVerticalO size={20} />
        <span>More</span>
      </button>

      <button
        onClick={() => navigate("/inventory")}
        className={commonButtonClasses("/inventory")}
      >
        <MdOutlineInventory size={20} />
        <span>Inventory</span>
      </button>

      <button
        onClick={() => navigate("/report")}
        className={commonButtonClasses("/report")}
      >
        <BiSolidReport size={20} />
        <span>Report</span>
      </button>

      <button
        disabled={
          isActive("/tables") ||
          isActive("/menu") ||
          isActive("/more") ||
          isActive("/inventory") ||
          isActive("/report")
        }
        onClick={openModal}
        className="absolute left-1/2 -translate-x-1/2 bottom-20 bg-[#f6B100] text-[#f5f5f5] rounded-full p-4 flex items-center justify-center hover:bg-[#e5a400] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        <BiSolidDish size={32} />
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Create Order">
        <div className="space-y-6">
          <div>
            <label className="block text-[#ababab] mb-2 text-sm font-medium">
              Customer Name
            </label>
            <div className="flex items-center border border-[#333] rounded-lg p-3 px-4 bg-[#1f1f1f]">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter Customer Name"
                className="bg-transparent w-full text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#ababab] mb-2 text-sm font-medium">
              Customer Phone
            </label>
            <div className="flex items-center border border-[#333] rounded-lg p-3 px-4 bg-[#1f1f1f]">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                pattern="[0-9]*"
                placeholder="+977 9999999999"
                className="bg-transparent w-full text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#ababab] mb-2 text-sm font-medium">
              Guest Count
            </label>
            <div className="flex items-center justify-between bg-[#1f1f1f] px-6 py-4 rounded-lg">
              <button
                onClick={decrement}
                className="text-[#f6B100] text-2xl hover:text-[#e5a400] transition-colors w-8 h-8 flex items-center justify-center"
              >
                &minus;
              </button>
              <span className="text-white text-lg font-medium">
                {guestCount} {guestCount === 1 ? "person" : "people"}
              </span>
              <button
                onClick={increment}
                className="text-[#f6B100] text-2xl hover:text-[#e5a400] transition-colors w-8 h-8 flex items-center justify-center"
              >
                &#43;
              </button>
            </div>
          </div>

          <button
            onClick={handleCreateOrder}
            // send data to store
            disabled={!name.trim() || !phone.trim() || guestCount === 0}
            className="w-full bg-[#f6B100] text-[#f5f5f5] rounded-lg py-3 mt-4 hover:bg-[#e5a400] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Order
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Bottom;
