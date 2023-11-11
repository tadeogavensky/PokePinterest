import React, { useContext, useEffect, useState } from "react";
import { PokemonContext } from "../../../../context/PokemonContext";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../Loader";
import { IoArrowBack } from "react-icons/io5";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { motion } from "framer-motion";
import typeColors from "../../../../utils/typeColors";
const Page = () => {
  const navigate = useNavigate();

  const { getPokemonById, addToFavorites, removeFromFavorites } =
    useContext(PokemonContext);
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);

  const [activeTab, setActiveTab] = useState("about");

  const switchTab = (tab) => {
    setActiveTab(tab);
  };
  const getPokemon = async (id) => {
    const res = await getPokemonById(id);
    setPokemon(res);

    const favorites = JSON.parse(localStorage.getItem("pokeFavs")) || [];
    setIsFavorite(favorites.some((fav) => fav.id === res.id));

    setLoading(false);
  };

  useEffect(() => {
    getPokemon(id);
  }, []);

  const menus = {
    about: <About pokemon={pokemon} />,
    baseStats: <BaseStats pokemon={pokemon} />,
    evolution: <Evolution pokemon={pokemon} />,
    moves: <Moves pokemon={pokemon} />,
  };

  const renderMenu = menus[activeTab];

  const backgroundColor =
    pokemon.types && pokemon.types.length > 0
      ? typeColors[pokemon.types[0].type.name] || "#fff"
      : "#fff";

  const formattedId = `#${
    pokemon.id < 10 ? "00" : pokemon.id < 100 ? "0" : ""
  }${pokemon.id}`;

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className="flex flex-col"
            style={{ backgroundColor, overflow: "hidden" }}
          >
            <div className="flex justify-between items-center  px-8 pt-12">
              <button className="text-white">
                <IoArrowBack size={30} onClick={() => navigate(-1)} />
              </button>

              <div className="relative">
                <button
                  className="text-white"
                  onClick={() => {
                    if (isFavorite) {
                      removeFromFavorites(pokemon);
                    } else {
                      // Add to favorites
                      addToFavorites(pokemon);
                    }
                    setIsFavorite(!isFavorite); // Toggle the state
                  }}
                >
                  {isFavorite ? (
                    <AiFillHeart size={30} />
                  ) : (
                    <AiOutlineHeart size={30} />
                  )}
                </button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex justify-between items-center  mt-4 px-8 z-30"
            >
              <div className="flex flex-col">
                <h1 className="font-body font-bold text-4xl text-white capitalize">
                  {pokemon.name}
                </h1>

                <div className="flex gap-1 mt-3">
                  {pokemon.types &&
                    pokemon.types.map((type, index) => {
                      return (
                        <span
                          key={index}
                          className="bg-white bg-opacity-30 rounded-full py-1 px-4"
                        >
                          <p className="capitalize text-center text-sm text-white font-body">
                            {type.type.name}
                          </p>
                        </span>
                      );
                    })}
                </div>
              </div>

              <h3 className="font-body font-bold text-white text-lg">
                {formattedId}
              </h3>
            </motion.div>
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              src={pokemon.sprites.other.dream_world.front_default}
              className="absolute bottom-[40%] z-10 left-[30%] sm:left-[35%] w-[40%] sm:w-[25%]"
            />
            <motion.div
              initial={{ opacity: 0, y: "200vh" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-t-3xl flex flex-col relative mt-60 py-12 px-6 "
            >
              <ul className="flex items-center border-b-2 justify-between ">
                <motion.li
                  className={`${
                    activeTab === "about"
                      ? "text-black border-b-2 border-black pb-4 "
                      : ""
                  } text-gray-400 font-body font-bold pb-4`}
                  onClick={() => switchTab("about")}
                  whileTap={{ scale: 0.95 }}
                  transition={{ borderBottom: { duration: 0.3 } }}
                >
                  About
                </motion.li>
                <motion.li
                  className={`${
                    activeTab === "baseStats"
                      ? "text-black border-b-2 border-black pb-4 "
                      : ""
                  } text-gray-400 font-body font-bold pb-4`}
                  onClick={() => switchTab("baseStats")}
                  whileTap={{ scale: 0.95 }}
                  transition={{ borderBottom: { duration: 0.3 } }}
                >
                  Base Stats
                </motion.li>
                <motion.li
                  className={`${
                    activeTab === "evolution"
                      ? "text-black border-b-2 border-black pb-4 "
                      : ""
                  } text-gray-400 font-body font-bold pb-4`}
                  onClick={() => switchTab("evolution")}
                  whileTap={{ scale: 0.95 }}
                  transition={{ borderBottom: { duration: 0.3 } }}
                >
                  Evolution
                </motion.li>
                <motion.li
                  className={`${
                    activeTab === "moves"
                      ? "text-black border-b-2 border-black pb-4 "
                      : ""
                  } text-gray-400 font-body font-bold pb-4`}
                  onClick={() => switchTab("moves")}
                  whileTap={{ scale: 0.95 }}
                  transition={{ borderBottom: { duration: 0.3 } }}
                >
                  Moves
                </motion.li>
              </ul>

              {renderMenu}
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};

const About = ({ pokemon }) => {
  return (
    <motion.div
      initial={{ x: "-100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-start justify-start gap-4 mt-6"
    >
      <div className="flex items-center gap-8">
        <h2 className="text-gray-400 font-body">Height</h2>
        <p className="font-body font-semibold">{pokemon.height} inches</p>
      </div>
      <div className="flex items-center gap-8">
        <h2 className="text-gray-400 font-body">Weight</h2>
        <p className="font-body font-semibold">{pokemon.weight} lbs</p>
      </div>
      <div className="flex items-center gap-8">
        <h2 className="text-gray-400 font-body">Abilities</h2>
        <div className="flex items-center gap-1">
          {pokemon.abilities.map((ability, index) => {
            return (
              <p key={index} className="font-body font-semibold capitalize">
                {index === pokemon.abilities.length - 1
                  ? ability.ability.name
                  : `${ability.ability.name}, `}
              </p>
            );
          })}
        </div>
      </div>

      <h1 className="font-body font-bold text-lg ">Breeding</h1>
      <div className="flex flex-col justify-start gap-4">
        <div className="flex items-center gap-8">
          <h2 className="text-gray-400 font-body">Gender</h2>
        </div>
        <div className="flex items-center gap-8">
          <h2 className="text-gray-400 font-body">Egg Groups</h2>
          <div className="flex items-center gap-1">
            {pokemon.eggGroups.map((eggGroup, index) => {
              return (
                <p key={index} className="font-body font-semibold capitalize">
                  {index === pokemon.abilities.length - 1
                    ? eggGroup.name
                    : `${eggGroup.name}, `}
                </p>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-8">
          <h2 className="text-gray-400 font-body">Egg Cycle</h2>
        </div>
      </div>
    </motion.div>
  );
};

const BaseStats = ({ pokemon }) => {
  const statNames = ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"];
  const totalStat = pokemon.stats.reduce(
    (total, stat) => total + stat.base_stat,
    0
  );
  return (
    <motion.div
      initial={{ x: "-100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col w-full justify-start gap-2 mt-6  "
      style={{ overflowY: "hidden" }}
    >
      {statNames.map((statName, index) => (
        <div
          key={index}
          className="flex items-center w-full justify-between gap-10 mr-auto"
        >
          <h1 className="text-gray-400 font-body">{statName}</h1>
          <div className="flex items-center gap-4">
            <p>{pokemon.stats[index].base_stat}</p>{" "}
            <div className="w-[200px] h-[3px] bg-gray-300 relative">
              <motion.div
                className="w-32 h-1 bg-gray-300 relative"
                initial={{ width: 0 }}
                animate={{
                  width: `${(pokemon.stats[index].base_stat / 120) * 100}%`,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                }}
              >
                <div
                  className={`h-1 ${
                    pokemon.stats[index].base_stat < 50
                      ? "bg-red-400"
                      : "bg-green-400"
                  }`}
                ></div>
              </motion.div>
            </div>
          </div>
        </div>
      ))}
      <div className="flex items-center justify-between">
        <h1 className="text-gray-400 font-body">Total</h1>
        <div className="flex items-center gap-3">
          <p>
            {pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0)}
          </p>
          <div className="w-[200px] h-[3px] bg-gray-300 relative">
            <motion.div
              className="w-32 h-1 bg-gray-300 relative"
              initial={{ width: 0 }}
              animate={{
                width: `${(totalStat / (80 * statNames.length)) * 100}%`,
              }}
              transition={{
                duration: 0.5,
                delay: 0.3,
              }}
            >
              <div
                className={`h-1 ${
                  totalStat < 150 ? "bg-red-600" : "bg-green-400"
                }`}
              ></div>
            </motion.div>
          </div>
        </div>
      </div>

      {/*  <div className="mt- flex flex-col justify-start gap-2">
        <h1 className="font-bold font-body text-lg">Type defenses</h1>
        <p className="text-gray-400 font-body font-bold ">
          The effectiveness of each types on{" "}
          <span className="capitalize">{pokemon.name}</span>
        </p>
      </div> */}
    </motion.div>
  );
};

const Evolution = ({ pokemon }) => {
  /*  const evolutionChain = pokemon.evolutionData.chain;

  const processEvolutionChain = (chain) => {
    const results = [];

    const { species, evolution_details } = chain;
    const speciesName = species.name;

    results.push(speciesName);

    if (chain.evolves_to && chain.evolves_to.length > 0) {
      chain.evolves_to.forEach((nextEvolution) => {
        results.push(...processEvolutionChain(nextEvolution));
      });
    }

    return results;
  };

  const evolutionResults = processEvolutionChain(evolutionChain); */
  return (
    <motion.div
      initial={{ x: "-100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="mt-6"
    >
      <h1 className="text-2xl font-body font-extrabold">Evolution Chain</h1>

      {/* <ul>
        {evolutionResults.map((speciesName, index) => (
          <li key={index} className="font-body">
            {speciesName}
          </li>
        ))}
      </ul> */}
    </motion.div>
  );
};

const Moves = ({ pokemon }) => {
  return (
    <motion.div
      initial={{ x: "-100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-4 mt-6"
    >
      <h1 className="text-2xl font-body font-extrabold">Moves</h1>

      {pokemon.moves ? (
        <ul className="flex flex-col gap-2">
          <li className="flex items-center justify-between">
            <h1 className="text-gray-400 font-body">Accuracy</h1>
            <div className="flex items-center gap-4">
              <p>{pokemon.moves.accuracy}</p>
              <div className="w-[200px] h-[3px] bg-gray-300 relative">
                <motion.div
                  className="w-32 h-1 bg-gray-300 relative"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(pokemon.moves.accuracy / 100) * 100}%`,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3,
                  }}
                >
                  <div
                    className={`h-1 ${
                      pokemon.moves.accuracy < 50
                        ? "bg-red-400"
                        : "bg-green-400"
                    }`}
                  ></div>
                </motion.div>
              </div>
            </div>
          </li>
          <li className="flex items-center justify-between">
            <h1 className="text-gray-400 font-body">PP</h1>
            <div className="flex items-center gap-4">
              <p>{pokemon.moves.pp}</p>
              <div className="w-[200px] h-[3px] bg-gray-300 relative">
                <motion.div
                  className="w-32 h-1 bg-gray-300 relative"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(pokemon.moves.pp / 100) * 100}%`,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3,
                  }}
                >
                  <div
                    className={`h-1 ${
                      pokemon.moves.pp < 50 ? "bg-red-400" : "bg-green-400"
                    }`}
                  ></div>
                </motion.div>
              </div>
            </div>
          </li>

          <li className="flex items-center justify-between">
            <h1 className="text-gray-400 font-body">Power</h1>
            <div className="flex items-center gap-4">
              <p>{pokemon.moves.power}</p>
              <div className="w-[200px] h-[3px] bg-gray-300 relative">
                <motion.div
                  className="w-32 h-1 bg-gray-300 relative"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(pokemon.moves.power / 100) * 100}%`,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3,
                  }}
                >
                  <div
                    className={`h-1 ${
                      pokemon.moves.power < 50 ? "bg-red-400" : "bg-green-400"
                    }`}
                  ></div>
                </motion.div>
              </div>
            </div>
          </li>

          <li className="flex items-center justify-between">
            <h1 className="text-gray-400 font-body">Contest Type</h1>
            <div className=" text-left">
              <p className="capitalize font-semibold font-body">
                {pokemon.moves.contest_type.name}
              </p>
            </div>
          </li>
          <li className="flex items-center justify-between">
            <h1 className="text-gray-400 font-body">Damage Class</h1>
            <div className=" text-left">
              <p className="capitalize font-semibold font-body">
                {pokemon.moves.damage_class.name}
              </p>
            </div>
          </li>
          <li className="flex items-center justify-between">
            <h1 className="text-gray-400 font-body">Effect Entries</h1>
            <div className="text-right">
              {pokemon.moves.effect_entries.map((effect, index) => (
                <p key={index} className="capitalize font-semibold font-body">
                  <span className="font-body font-semibold capitalize">
                    {effect.short_effect.split(". ").map((sentence, i) => (
                      <React.Fragment key={i}>
                        {i > 0 && <br />}
                        {sentence}
                      </React.Fragment>
                    ))}
                  </span>
                </p>
              ))}
            </div>
          </li>

          {pokemon.moves.contest_combos &&
            pokemon.moves.contest_combos.normal.use_before !== null && (
              <li className="flex items-center gap-12 justify-between">
                <h1 className="text-gray-400 font-body">Normal Combos</h1>
                <div className="flex items-center gap-1">
                  {pokemon.moves.contest_combos.normal.use_before.map(
                    (combo, index) => {
                      return (
                        <p className="capitalize font-semibold font-body">
                          <p
                            key={index}
                            className="font-body font-semibold capitalize"
                          >
                            {index ===
                            pokemon.moves.contest_combos.normal.use_before
                              .length -
                              1
                              ? combo.name
                              : `${combo.name}, `}
                          </p>
                        </p>
                      );
                    }
                  )}
                </div>
              </li>
            )}

          {pokemon.moves.contest_combos &&
            pokemon.moves.contest_combos.super.use_before !== null && (
              <li className="flex items-center gap-12 justify-between">
                <h1 className="text-gray-400 font-body">Super Combos</h1>
                <div className="flex items-center gap-1">
                  {pokemon.moves.contest_combos.super.use_before.map(
                    (combo, index) => {
                      return (
                        <p className="capitalize font-semibold font-body">
                          <p
                            key={index}
                            className="font-body font-semibold capitalize"
                          >
                            {index ===
                            pokemon.moves.contest_combos.super.use_before
                              .length -
                              1
                              ? combo.name
                              : `${combo.name}, `}
                          </p>
                        </p>
                      );
                    }
                  )}
                </div>
              </li>
            )}

          {/*  <li>
            <h3>Damage Class:</h3> {pokemon.damage_class.name}
          </li>
          <li>
            <h3>Effect:</h3> {pokemon.effect_entries[0].short_effect}
          </li>
          <li>
            <h3>Type:</h3> {pokemon.type.name}
          </li>
          <li>
            <h3>Learned by Pokemon:</h3>
            <ul>
              {pokemon.learned_by_pokemon.map((learnedPokemon) => (
                <li key={learnedPokemon.name}>
                  <strong>{learnedPokemon.name}:</strong> {learnedPokemon.url}
                </li>
              ))}
            </ul>
          </li> */}
        </ul>
      ) : (
        <p>No moves available for this Pokemon.</p>
      )}
    </motion.div>
  );
};

export default Page;
