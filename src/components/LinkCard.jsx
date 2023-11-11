import { Link } from "react-router-dom";
import pokeball from "../assets/images/pokeball.png";

const LinkCard = ({ color, pathname, title }) => {
  return (
    <Link
      to={pathname}
      className="w-full sm:w-[200px] relative rounded-xl shadow-lg h-[60px] overflow-hidden  flex justify-between items-center  py-6 px-4"
      style={{
        backgroundColor: color,
        backgroundImage: pokeball,
        backgroundPosition: "right",
      }}
    >
      <img
        src={pokeball}
        className="w-[85%] absolute opacity-30 bottom-6 -left-20 "
        alt=""
      />
      <p className="font-body text-white font-bold text-base">{title}</p>

      <img
        src={pokeball}
        className="w-[65%] absolute opacity-30 -right-8 "
        alt=""
      />
    </Link>
  );
};

export default LinkCard;
