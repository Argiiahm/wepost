import { useEffect, useState } from "react";
const baseURL = import.meta.env.VITE_API_BASE_URL;

type Post = {
  user: {
    id: number;
    username: string;
  };
  id: number;
  title: string;
  content: string;
  created_at: string;
  category: {
    name: string;
  };
};

const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/posts`);
      const data = await res.json();
      setPosts(data);
    } catch (err: any) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, fetchPosts };
};

export default usePosts;
