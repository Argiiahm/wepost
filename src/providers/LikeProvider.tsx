import { useEffect, useState } from "react";
import { LikeContext } from "../contexts/LikeContext";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const LikeProvider = ({ children }: { children: React.ReactNode }) => {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const token = localStorage.getItem("token");
  // handle like/unlike post with optimistic update
  const handlePostLike = async (postId: number) => {
    const isLiked = likedPosts.includes(postId);
    // optimistic update
    if (isLiked) {
      // if the post is already liked, we remove it from the likedPosts state immediately
      setLikedPosts((prev) => prev.filter((id) => id !== postId));
    } else {
      // if the post is not liked, we add it to the likedPosts state immediately
      setLikedPosts((prev) => [...prev, postId]);
    }

    // send like/unlike request to the server
    try {
      if (!token) return;
      await fetch(`${baseURL}/post/${postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);
      // revert optimistic update if request fails
      if (isLiked) {
        setLikedPosts((prev) => [...prev, postId]);
        // if the post was previously liked, we add it back to the likedPosts state
      } else {
        setLikedPosts((prev) => prev.filter((id) => id !== postId));
      }
    }
  };

  // Fetch liked posts for the current user
  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        if (!token) return;
        const res = await fetch(`${baseURL}/like-activity`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          return;
        }
        // Extract post IDs from the liked posts data
        const likedIds = data.map((like: any) => like.post_id);
        setLikedPosts(likedIds);
      } catch (error) {
        console.error("Error fetching liked posts:", error);
      }
    };

    fetchLikedPosts();
  }, []);

  return (
    <LikeContext.Provider value={{ likedPosts, handlePostLike }}>
      {children}
    </LikeContext.Provider>
  );
};

export default LikeProvider;
