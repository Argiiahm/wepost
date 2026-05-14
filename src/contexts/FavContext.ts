import { createContext } from "react";

type FavContextType = {
  FavPosts: number[];
  // function async yang mengembalikan Promise, tapi tidak return data apa pun.
  handleFavPosts: (postId: number) => Promise<void>;
};

export const FavContext = createContext<FavContextType | null>(null);
