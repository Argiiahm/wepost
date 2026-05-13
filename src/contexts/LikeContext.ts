import { createContext } from "react";

type LikeContextType = {
  likedPosts: number[];
  handlePostLike: (postId: number) => Promise<void>;
};

export const LikeContext = createContext<LikeContextType | null>(null);
