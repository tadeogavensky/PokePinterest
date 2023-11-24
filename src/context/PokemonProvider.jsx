import { useEffect, useState } from "react";
import { PokemonContext } from "./PokemonContext";

import axios from "axios";
const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [randomPokemon, setRandomPokemon] = useState({});
  const [globalPokemons, setGlobalPokemons] = useState([]);
  const [pokemonsByFilter, setPokemonsByFilter] = useState([]);

  const [globalPokemonsVisible, setGlobalPokemonsVisible] = useState(false);
  const [limitedPokemonsVisible, setLimitedPokemonsVisible] = useState(true);

  const [isModalVisible, setModalVisibility] = useState(false);
  const [filters, setFilters] = useState([
    { name: "normal", active: false },
    { name: "fire", active: false },
    { name: "water", active: false },
    { name: "electric", active: false },
    { name: "grass", active: false },
    { name: "ice", active: false },
    { name: "fighting", active: false },
    { name: "poison", active: false },
    { name: "ground", active: false },
    { name: "flying", active: false },
    { name: "psychic", active: false },
    { name: "bug", active: false },
    { name: "rock", active: false },
    { name: "ghost", active: false },
    { name: "dark", active: false },
    { name: "dragon", active: false },
    { name: "steel", active: false },
    { name: "fairy", active: false },
  ]);

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("pokeFavs")) || []
  );

  const [offset, setOffset] = useState(0);

  const [loading, setLoading] = useState(true);

  const currentMonth = new Date().getMonth() + 1;


  const getPokemons = async (limit = 10) => {
    setPokemons([]);
    try {
      const URL = "https://pokeapi.co/api/v2";

      const res = await axios.get(
        `${URL}/pokemon?limit=${limit}&offset=${offset}`,
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const pokemons = res.data.results;

      const promises = pokemons.map(async (pokemon) => {
        const res = await axios.get(pokemon.url, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
        });
        return res.data;
      });

      const results = await Promise.all(promises);

      setTimeout(() => {
        setPokemons(results);
        setLoading(false);
      }, 300);
    } catch (error) {
      setLoading(false);
    }
  };

  const getAllPokemons = async (limit = 50) => {
    setGlobalPokemons([]);

    const URL = "https://pokeapi.co/api/v2";

    const res = await axios.get(
      `${URL}/pokemon?limit=${limit}&offset=${offset}`,
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const pokemons = res.data.results;

    const promises = pokemons.map(async (pokemon) => {
      const res = await axios.get(pokemon.url, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      });

      return res.data;
    });

    const results = await Promise.all(promises);

    setGlobalPokemons([...globalPokemons, ...results]);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const getPokemonById = async (id) => {
    const URL = "https://pokeapi.co/api/v2";

    try {
      const res = await axios.get(`${URL}/pokemon/${id}`, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const pokemon = res.data;

      const evolutionRes = await axios.get(`${URL}/evolution-chain/${id}`, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const evolutionData = evolutionRes.data;

      let characteristicData;
      try {
        const characteristicRes = await axios.get(
          `${URL}/characteristic/${id}`,
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        characteristicData = characteristicRes.data;
      } catch (characteristicError) {
        if (
          characteristicError.response &&
          characteristicError.response.status === 404
        ) {
          console.error(
            "Characteristic not found:",
            characteristicError.message
          );
          characteristicData = {};
        } else {
          throw characteristicError;
        }
      }

      const speciesRes = await axios.get(pokemon.species.url, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const speciesData = speciesRes.data;
      const eggGroups = speciesData.egg_groups;

      let genderData;
      try {
        const genderId =
          speciesData.gender_rate === -1
            ? 3
            : speciesData.gender_rate === 0
            ? 0
            : 1;
        const genderRes = await axios.get(`${URL}/gender/${genderId}`, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
        });
        genderData = genderRes.data;
      } catch (genderError) {
        if (genderError.response && genderError.response.status === 404) {
          genderData = {};
        } else {
          throw genderError;
        }
      }

      const movesRes = await axios.get(`${URL}/move/${id}`, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const movesData = movesRes.data;

      pokemon.evolutionData = evolutionData;
      pokemon.eggGroups = eggGroups;
      pokemon.moves = movesData;
      pokemon.characteristics = characteristicData;
      pokemon.gender = genderData;

      return pokemon;
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
      // Handle the error appropriately
      throw error; // Rethrow the error or handle it based on your use case
    }
  };

  const filterPokemons = () => {
    const sourcePokemons = globalPokemonsVisible ? globalPokemons : pokemons;

    const filteredPokemons = sourcePokemons.filter((pokemon) =>
      pokemon.types.some((type) =>
        filters.find(
          (filter) => filter.name === type.type.name && filter.active
        )
      )
    );

    setPokemonsByFilter([]);

    setPokemonsByFilter([...filteredPokemons]);
  };

  const addToFavorites = (pokemon) => {
    const updatedFavorites = [...favorites, pokemon];
    setFavorites(updatedFavorites);

    localStorage.setItem("pokeFavs", JSON.stringify(updatedFavorites));
  };

  const getRandomPokemon = async (id) => {
    try {
      const URL = "https://pokeapi.co/api/v2";

      const res = await axios.get(`${URL}/pokemon/${id}`, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log("res.data :>> ", res.data);

      setTimeout(() => {
        setRandomPokemon(res.data);
        setLoading(false);
      }, 300);
    } catch (error) {
      setLoading(false);
    }
  };

  const removeFromFavorites = (pokemon) => {
    const index = favorites.findIndex((fav) => fav.id === pokemon.id);

    if (index !== -1) {
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(index, 1);

      setFavorites(updatedFavorites);

      localStorage.setItem("pokeFavs", JSON.stringify(updatedFavorites));
    }
  };

  const changeOffset = async () => {
    setOffset(offset + 20);
  };

  const toggleModal = async () => {
    setModalVisibility(!isModalVisible);
  };

  useEffect(() => {
    getPokemons();
  }, [offset]);

  useEffect(() => {
    getAllPokemons();
  }, []);

  const storedPokemonId = localStorage.getItem("month-pokemon-id");
  const initialPokemonId =
    storedPokemonId || Math.floor(Math.random() * 100) + currentMonth;

  useEffect(() => {
    localStorage.setItem("month-pokemon-id", initialPokemonId);
    getRandomPokemon(initialPokemonId);
  }, []);

  useEffect(() => {
    filterPokemons();
  }, [filters]);

  return (
    <PokemonContext.Provider
      value={{
        getPokemonById,
        pokemons,
        globalPokemons,
        pokemonsByFilter,
        addToFavorites,
        removeFromFavorites,
        favorites,
        setOffset,
        loading,
        filterPokemons,
        toggleModal,
        filters,
        setFilters,
        changeOffset,
        isModalVisible,
        setGlobalPokemonsVisible,
        setLimitedPokemonsVisible,
        globalPokemonsVisible,
        limitedPokemonsVisible,
        getAllPokemons,
        randomPokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
