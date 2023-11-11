import React, { useContext } from "react";
import { Link } from "react-router-dom";
import pokeball from "../../../assets/images/pokeball.png";
import typeColors from "../../../utils/typeColors";
import pikachu from "../../../assets/images/pikachu.png";
import { PokemonContext } from "../../../context/PokemonContext";
const Card = ({ pokemon }) => {
  const { loading } = useContext(PokemonContext);
  const backgroundColor =
    pokemon.types && pokemon.types.length > 0
      ? typeColors[pokemon.types[0].type.name] || "#fff"
      : "#fff";

  return (
    <Link
      to={`/pokedex/pokemon/${pokemon.id}`}
      className="w-full shadow-lg h-[100px] max-xs:h-[150px] rounded-2xl py-4 px-3 flex max-xs:flex-col justify-between gap-4 relative overflow-hidden"
      style={{
        backgroundColor,
      }}
    >
      <img src={pokeball} className="absolute opacity-25 -top-14 -left-16" alt="" />

      <div className="flex flex-col">
        <h1 className="font-bold font-body capitalize text-white text-base">
          {pokemon.name}
        </h1>

        <div className="flex flex-col gap-1 mt-1">
          {pokemon?.types &&
            pokemon?.types.map((type, index) => {
              return (
                <span
                  key={index}
                  className="bg-white bg-opacity-30 rounded-full  py-1"
                >
                  <p className="capitalize text-center text-[10px] text-white font-body font-bold">
                    {type.type.name}
                  </p>
                </span>
              );
            })}
        </div>
      </div>

      <img src={pokeball} className="absolute opacity-25 -right-5" alt="" />
      {loading ? (
        <img src={loadingImage} alt="Loading..." className="w-[40%] z-10" />
      ) : (
        <img
          src={pokemon.sprites.other.dream_world.front_default}
          className="w-[40%] z-10"
          alt={pokemon.name}
        />
      )}
    </Link>
  );
};

export default Card;
