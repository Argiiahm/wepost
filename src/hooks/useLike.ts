import { useContext } from "react";
import { LikeContext } from "../contexts/LikeContext";

const useLike = () => {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error("useLike must be used within LikeProvider");
  }
  return context;
};

export default useLike;
