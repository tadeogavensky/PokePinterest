import React, { useContext, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { TfiMenuAlt } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Card from "../pokedex/Card";
import { PokemonContext } from "../../../context/PokemonContext";
import SideMenu from "../../SideMenu";
const Favorites = () => {
  const navigate = useNavigate();

  const { favorites } = useContext(PokemonContext);

  const [isSideMenuOpenu, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative px-8 pt-12 overflow-hidden">
      <div className="flex justify-between items-center">
        <button>
          <IoArrowBack size={30} onClick={() => navigate(-1)} />
        </button>

        <button
          className="z-50"
          onClick={() => {
            setMenuOpen(!isSideMenuOpenu);
          }}
        >
          <TfiMenuAlt size={30} />
        </button>
      </div>

      <h1 className="text-3xl font-body text-gray-700 leading-normal font-extrabold my-4">
        Favorites
      </h1>

      <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 grid-flow-row gap-2">
        {favorites.length > 0 ? (
          favorites.map((pokemon, index) => {
            return (
              <motion.div
                initial={{ x: -100, y: 30, opacity: 0 }}
                whileInView={{ x: 0, y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                key={index}
              >
                <Card pokemon={pokemon} />
              </motion.div>
            );
          })
        ) : (
          <h1 className="text-xl font-semibold w-full">
            You don't have any favorite pokemon :(
          </h1>
        )}
      </motion.div>

      <AnimatePresence>{isSideMenuOpenu && <SideMenu />}</AnimatePresence>
    </div>
  );
};

export default Favorites;
