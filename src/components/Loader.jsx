import { motion } from "framer-motion";
const Loader = () => {
  const spinTransitionFineTuned = {
    rotate: {
      loop: Infinity,
      ease: "linear",
      duration: 1,
    },
    scale: {
      duration: 0.5,
    },
  };

  const circleStyle = {
    display: "block",
    width: "3rem",
    height: "3rem",
    border: "0.5rem solid #e9e9e9",
    borderTop: "0.5rem solid #3498db",
    borderRadius: "50%",
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="font-pokemon text-6xl font-bold animate-pulse">
        PokePinterest
      </h1>
    </div>
  );
};

export default Loader;
