import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { formatDate, getAvatarName } from '../../utils';

const CustomerInfo = () => {
  const customerData = useSelector((state) => state.customer);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    // Update date every minute
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!customerData.customerName) {
    return null; // Don't render if no customer data
  }

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex flex-col items-start">
        <h1 className='text-md text-[#f5f5f5] font-semibold'>
          {customerData.customerName || 'Customer Name'}
        </h1> 
        <p className='text-xs text-[#ababab] font-medium mt-1'>
          {customerData.orderId ? `#${customerData.orderId}` : ''} / Dine in
        </p>
        <p className='text-xs text-[#ababab] font-medium mt-1'>
          {formatDate(dateTime)}
        </p>
      </div>
      <button className='bg-[#f6b100] text-xl font-bold rounded-lg p-3'>
        {getAvatarName(customerData.customerName)}
      </button>
    </div>
  );
};

export default CustomerInfo;