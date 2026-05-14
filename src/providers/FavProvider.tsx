import { useEffect, useState } from "react";
import { FavContext } from "../contexts/FavContext";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const FavProvider = ({ children }: { children: React.ReactNode }) => {
  const [FavPosts, setFavPosts] = useState<number[]>([]);

  const handleFavPosts = async (postId: number) => {
    // cek apakah di state favPost terdapat id dengan id postId?
    const isFav = FavPosts.includes(postId);

    if (isFav) {
      // when user fav this post 2 times
      // ambil semua id, kecuali id yang ada di postID
      setFavPosts((prev) => prev.filter((id) => id !== postId));
    } else {
      // when user not fav this post, create fav to state FavPosts.
      // get all old data and then added new data from PostId
      setFavPosts((prev) => [...prev, postId]);
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      await fetch(`${baseURL}/post/${postId}/favorit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);
      // Batalkan pembaruan jika permintaan gagal
      if (isFav) {
        setFavPosts((prev) => [...prev, postId]);
      } else {
        setFavPosts((prev) => prev.filter((id) => id !== postId));
      }
    }
  };

  useEffect(() => {
    const fetchFavPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await fetch(`${baseURL}/favorits-activity`, {
          method: "GET",
          headers: {
            "Content-Type": "application-json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        const FavIds = data.map((fav: any) => fav.post_id);
        setFavPosts(FavIds);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFavPosts();
  }, []);

  return (
    <FavContext.Provider value={{ FavPosts, handleFavPosts }}>
      {children}
    </FavContext.Provider>
  );
};

export default FavProvider;
