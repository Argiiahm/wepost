import { useContext } from "react";
import { FavContext } from "../contexts/FavContext";

const useFav = () => {
  const context = useContext(FavContext);
  if (!context) {
    throw new Error("useLike must be used within FavProvider");
  }

  return context;
};

export default useFav;
