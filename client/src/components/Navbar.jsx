import React from 'react'
import { assets } from '../assets/assets'
// import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';

const Navbar = () => {

    
    const {navigate, token} = useAppContext()

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      <div onClick={() => navigate("/")} className="flex items-center gap-2">
        <img
          onClick={() => navigate("/")}
          src={assets.favicon}
          alt="logo"
          className="w-10 sm:w-10 cursor-pointer"
        />
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold cursor-pointer"
        >
          Blogify
        </h1>
      </div>

      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
      >
        {token ? "Dashboard" : "Login"}
        <img src={assets.arrow} className="w-3" alt="arrow" />
      </button>
    </div>
  );
}

export default Navbar
