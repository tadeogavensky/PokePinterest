import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import LinkCard from "../../LinkCard";
import pokeballGray from "../../../assets/images/pokeball-gray.png";
import Button from "../favorites/Button";
import { TfiMenuAlt } from "react-icons/tfi";
import SideMenu from "../../SideMenu";
import { PokemonContext } from "../../../context/PokemonContext";
import { AnimatePresence, motion } from "framer-motion";
import Card from "../pokedex/Card";

const Home = () => {
  const links = [
    { color: "#83ba36", title: "Pokedex", pathname: "/pokedex" },
    { color: "#de5138", title: "Moves", pathname: "/moves" },
    { color: "#93c8d0", title: "Abilities", pathname: "/abilities" },
    { color: "#f4dc26", title: "Items", pathname: "/items" },
    { color: "#733ca9", title: "Locations", pathname: "/locations" },
    { color: "#ad764e", title: "Type Charts", pathname: "/type-charts" },
  ];

  const { pokemons } = useContext(PokemonContext);

  const [isSideMenuOpenu, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative px-8 pt-12 overflow-hidden">
      <img
        src={pokeballGray}
        className="w-[100%] fixed opacity-10 -top-[20%] left-[45%] "
        alt=""
      />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-body text-gray-700 leading-normal font-extrabold">
          What Pokemon
          <br /> are you looking for?
        </h1>

        <button
          className="z-50"
          onClick={() => {
            setMenuOpen(!isSideMenuOpenu);
          }}
        >
          <TfiMenuAlt size={30} />
        </button>
      </div>

      <div className="relative w-full flex items-center bg-slate-50 rounded-full mt-6 shadow-sm">
        <FaSearch size={15} className="absolute left-4" />
        <input
          type="text"
          placeholder="Search Pokemon, Move, Ability, etc"
          className="bg-transparent w-full ml-6 py-3 px-6 placeholder:text-sm placeholder:font-bold shadow-none border-none outline-none focus:ring-0 ring-0 focus:border-0"
        />
      </div>

      <motion.div className="mt-6 grid grid-cols-2 sm:flex flex-wrap justify-center grid-flow-row gap-4">
        {links.map((link, index) => {
          return (
            <motion.div
              initial={{ x: -100, y: 30, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              key={index}
            >
              <LinkCard
                title={link.title}
                pathname={link.pathname}
                color={link.color}
              />
            </motion.div>
          );
        })}
      </motion.div>

      <div className="flex flex-col my-8">
        <h3 className="text-2xl font-body text-gray-700 leading-normal font-extrabold">
          Take a look to some of our pokemons
        </h3>

        <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 grid-flow-row gap-2 mt-2">
          {pokemons.map((pokemon, index) => {
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
      </div>

      <AnimatePresence>{isSideMenuOpenu && <SideMenu />}</AnimatePresence>
    </div>
  );
};

export default Home;
