import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
const Button = () => {
  return (
    <Link className="bg-[#f34848] flex p-4 rounded-full shadow-md" to={"/favorites"}>
      <AiFillHeart size={30} className="text-white" />
    </Link>
  );
};

export default Button;
