import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom'; // Import useNavigate



const BackButton = () => {

    const navigate=useNavigate();

  return (
    <button onClick={() => navigate(-1)}className='bg-[#025cca] p-2 text-xl font-bold rounded-full text-white '>
<IoIosArrowBack />
    </button>
  )
}

export default BackButton