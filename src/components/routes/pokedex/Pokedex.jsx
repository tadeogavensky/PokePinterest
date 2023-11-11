import React, { useContext, useEffect, useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { TfiMenuAlt } from "react-icons/tfi";
import { PokemonContext } from "../../../context/PokemonContext";
import Card from "./Card";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../favorites/Button";
import { FaSearch } from "react-icons/fa";
import SideMenu from "../../SideMenu";
import Filter from "../../filter/Filter";
import Modal from "../../filter/Modal";

const Pokedex = () => {
  const navigate = useNavigate();

  const {
    pokemons,
    globalPokemons,
    pokemonsByFilter,
    changeOffset,
    isModalVisible,
    setQuery,
    setGlobalPokemonsVisible,
    setLimitedPokemonsVisible,
  } = useContext(PokemonContext);

  const [viewAll, setViewAll] = useState(false);

  const [isSideMenuOpenu, setMenuOpen] = useState(false);

  useEffect(() => {
    setQuery("");
  }, [viewAll, setQuery]);

  return (
    <div className="relative flex flex-col px-8 pt-12 mb-10 overflow-hidden">
      {/*   <img
        src={pokeballGray}
        className="w-[100%] absolute opacity-10 top-[-5.5rem] left-[47%] "
        alt=""
      /> */}
      <div className="flex justify-between items-center">
        <button>
          <IoArrowBack size={30} onClick={() => navigate(-1)} />
        </button>

        <div className="relative">
          <button>
            <TfiMenuAlt
              size={30}
              onClick={() => {
                setMenuOpen(!isSideMenuOpenu);
              }}
            />
          </button>
        </div>
      </div>

      <h1 className=" font-body font-extrabold text-4xl text-gray-900 mt-6">
        Pokedex
      </h1>

      <AnimatePresence>
        {viewAll && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            exit={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="relative w-full flex items-center bg-slate-50 rounded-full my-6 shadow-sm"
          >
            <FaSearch size={15} className="absolute left-4" />
            <input
              type="text"
              placeholder="Search Pokemon"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              className="bg-transparent w-full ml-6 py-3 px-6 placeholder:text-sm placeholder:font-bold shadow-none border-none outline-none focus:ring-0 ring-0 focus:border-0"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col justify-end">
        {!pokemonsByFilter.length && (
          <div className="w-full flex justify-end">
            <button
              onClick={() => {
                if (viewAll == true) {
                  setViewAll(false);
                  setGlobalPokemonsVisible(false);
                  setLimitedPokemonsVisible(true);
                } else {
                  setViewAll(true);
                  setGlobalPokemonsVisible(true);
                  setLimitedPokemonsVisible(false);
                }
              }}
              className=" m-2 text-xl font-body font-bold text-blue-700"
            >
              {!viewAll ? "View all" : "Hide"}
            </button>
          </div>
        )}

        {pokemonsByFilter.length > 0 && (
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 relative  gap-2">
            {!viewAll ||
              (!pokemonsByFilter.length && (
                <button
                  onClick={() => {
                    changeOffset();
                  }}
                  className="absolute z-50 text-white top-[40%] right-0 bg-blue-500 hover:bg-blue-700 transition rounded-full p-2 flex justify-center items-center"
                >
                  <IoArrowForward size={40} />
                </button>
              ))}
            {pokemonsByFilter.map((pokemon, index) => (
              <motion.div
                initial={{ x: -100, y: 30, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                key={index}
              >
                <Card pokemon={pokemon} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {viewAll ? (
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 relative  gap-2">
            {!pokemonsByFilter.length && !viewAll && (
              <button
                onClick={() => {
                  changeOffset();
                }}
                className="absolute z-50 text-white top-[40%] right-0 bg-blue-500 hover:bg-blue-700 transition rounded-full p-2 flex justify-center items-center"
              >
                <IoArrowForward size={40} />
              </button>
            )}
            {!pokemonsByFilter.length &&
              globalPokemons.map((pokemon, index) => {
                return (
                  <motion.div
                    initial={{ x: -100, y: 30, opacity: 0 }}
                    animate={{ x: 0, y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                    key={index}
                  >
                    <Card pokemon={pokemon} />
                  </motion.div>
                );
              })}
          </motion.div>
        ) : (
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 relative  gap-2">
            <button
              onClick={() => {
                changeOffset();
              }}
              className="absolute z-50 text-white top-[40%] right-0 bg-blue-500 hover:bg-blue-700 transition rounded-full p-2 flex justify-center items-center"
            >
              <IoArrowForward size={40} />
            </button>
            {!pokemonsByFilter.length &&
              pokemons.map((pokemon, index) => {
                return (
                  <motion.div
                    initial={{ x: -100, y: 30, opacity: 0 }}
                    animate={{ x: 0, y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                    key={index}
                  >
                    <Card pokemon={pokemon} />
                  </motion.div>
                );
              })}
          </motion.div>
        )}
      </div>

      <div className="fixed right-0 bottom-0 m-4 z-20">
        <Filter />
      </div>

      <AnimatePresence>{isSideMenuOpenu && <SideMenu />}</AnimatePresence>
    </div>
  );
};

export default Pokedex;
