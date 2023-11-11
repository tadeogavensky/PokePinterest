import React, { useContext, useState } from "react";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { PokemonContext } from "../../context/PokemonContext";
import { AnimatePresence } from "framer-motion";
import Modal from "./Modal";
const Filter = () => {
  const { toggleModal, isModalVisible } = useContext(PokemonContext);

  return (
    <div className="relative">
      <button
        onClick={toggleModal}
        className="bg-blue-500 hover:bg-blue-700 transition text-white p-3 shadow-xl flex justify-center items-center rounded-full"
      >
        <HiAdjustmentsHorizontal size={40} />
      </button>
      <AnimatePresence>{isModalVisible && <Modal />}</AnimatePresence>
    </div>
  );
};

export default Filter;
