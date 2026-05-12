import { OrbitProgress } from "react-loading-indicators";
import useAuth from "../hooks/useAuth";
import PostCard from "../components/PostCard";
import { formatDistanceToNow } from "date-fns";
import usePosts from "../hooks/usePosts";
import { useEffect } from "react";

const Profile = () => {
  const { me, loading } = useAuth();
  const { fetchPosts } = usePosts();

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="container max-w-3xl h-full mx-auto p-6">
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
        <div className="h-full md:border border-zinc-900 md:p-6 rounded-4xl">
          {/* Profile Content */}
          <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
            <div>
              <h1 className="text-2xl text-white font-bold">{me?.user.name}</h1>
              <span className="text-zinc-500">{me?.user.username}</span>
            </div>

            <img
              className="w-16 h-16 rounded-full"
              src={`https://ui-avatars.com/api/?name=${me?.user.username}&background=random`}
            />
          </div>

          {/* My posts */}
          <div className="mt-8">
            <h2 className="text-xl text-white font-bold mb-4">My Posts</h2>

            {me?.posts.length === 0 ? (
              <p className="text-zinc-500">No posts yet.</p>
            ) : (
              me?.posts.map((post: any) => (
                <PostCard
                  key={post.id}
                  name={me?.user.name}
                  title={post.title}
                  content={post.content}
                  createdAt={formatDistanceToNow(new Date(post.created_at), {
                    addSuffix: true,
                  })}
                  id={post.id}
                  category_name={post.category?.name || "wepost"}
                />
              ))
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
