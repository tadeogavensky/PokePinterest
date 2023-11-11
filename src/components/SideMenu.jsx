import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BiHomeAlt2 } from "react-icons/bi";
import {TbPokeball} from "react-icons/tb"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const SideMenu = () => {
  return (
    <motion.nav
      initial={{ x: "100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100vw", opacity: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
      className="bg-white shadow-xl border-[1px] w-[200px] rounded-xl  p-4 z-50 absolute top-32 right-10  "
    >
      <ul className="flex flex-col gap-2">
        <Link
          to={"/"}
          className="flex items-center gap-1 w-full justify-between border-b-2 pb-2"
        >
          <p className="text-2xl font-body font-bold">Home</p>
          <BiHomeAlt2 size={30} />
        </Link>
        <Link
          to={"/pokedex"}
          className="flex items-center gap-1 w-full justify-between border-b-2 pb-2"
        >
          <p className="text-2xl font-body font-bold">Pokedex</p>
          <TbPokeball size={30}/>
        </Link>
        <Link
          to={"/favorites"}
          className="flex items-center gap-1 w-full justify-between"
        >
          <p className="text-2xl font-body font-bold">Favorites</p>
          <AiOutlineHeart size={30}/>
        </Link>
      </ul>
    </motion.nav>
  );
};

export default SideMenu;
