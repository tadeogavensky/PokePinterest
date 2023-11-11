import React, { useContext } from "react";

import { motion } from "framer-motion";
import { PokemonContext } from "../../context/PokemonContext";

const Modal = () => {
  const { filters, setFilters } = useContext(PokemonContext);

  const handleCheckboxChange = (name) => {
    setFilters((prevFilters) =>
      prevFilters.map((filter) =>
        filter.name === name ? { ...filter, active: !filter.active } : filter
      )
    );
  };

  const handleClearButtonClick = () => {
    setFilters((prevFilters) =>
      prevFilters.map((filter) => ({ ...filter, active: false }))
    );
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: "-100vw" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "-100vw" }}
      className="h-fit bg-white rounded-2xl w-[250px] z-50 shadow-md border-2 absolute p-4 bottom-12 right-20"
    >
      <div className="flex w-full justify-end">
        <button
          onClick={handleClearButtonClick}
          className="text-blue-600 font-body font-bold mb-2"
        >
          Clear
        </button>
      </div>
      <ul className="flex flex-col">
        {filters.map((filter, index) => {
          return (
            <li key={index} className="flex items-center justify-between">
              <p className="capitalize font-body font-bold">{filter.name}</p>
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(filter.name)}
                checked={filter.active}
                className="w-5 h-5"
              />
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default Modal;
