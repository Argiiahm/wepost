import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { OrbitProgress } from "react-loading-indicators";
import PostCard from "../../components/PostCard";
import ErrorPage from "../errors/ErrorPage";
import { useNavigate } from "react-router";
import { formatDistanceToNow } from "date-fns";
const baseURL = import.meta.env.VITE_API_BASE_URL;

type Post = {
  user: {
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

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const showPost = async () => {
      try {
        const res = await fetch(`${baseURL}/post/${id}`);
        const data = await res.json();
        if (!res.ok) {
          setPost(null);
          return;
        }
        setPost(data);
      } catch (err: any) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    showPost();
  }, []);

  if (!loading && !post) {
    return <ErrorPage />;
  }

  return (
    <section className="container max-w-3xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-white cursor-pointer m-4"
      >
        Back
      </button>
      <div className="h-full md:border border-zinc-900 md:p-6 rounded-4xl">
        {loading ? (
          <div className="flex justify-center flex-col gap-2 items-center mt-20">
            <OrbitProgress
              variant="spokes"
              color="white"
              size="small"
              text=""
              textColor=""
            />
            <span className="text-white">Loading content...</span>
          </div>
        ) : (
          <div className="max-h-[70vh] overflow-y-auto no-scrollbar">
            {post && (
              <PostCard
                key={post.id}
                id={post.id}
                username={post.user.username}
                createdAt={formatDistanceToNow(new Date(post.created_at), {
                  addSuffix: true,
                })}
                title={post.title}
                content={post.content}
                category_name={post.category?.name || "wepost"}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PostDetail;
