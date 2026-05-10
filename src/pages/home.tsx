import { OrbitProgress } from "react-loading-indicators";
import { formatDistanceToNow } from "date-fns";
import PostCard from "../components/PostCard";
import usePosts from "../hooks/usePosts";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import DialogPost from "../components/DialogPost";
import { Link } from "react-router";

const Home = () => {
  const { me, loading: LoadingAuth } = useAuth();
  const { posts, loading: LoadingPosts } = usePosts();
  const loading = LoadingAuth || LoadingPosts;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section className="container max-w-3xl h-full mx-auto p-6">
      <div className="h-full lg:border border-zinc-900 lg:p-6 rounded-4xl">
        {/* Create Post */}
        {me && (
          <div className="flex items-center justify-between text-white border-b  border-zinc-900 rounded-md md:px-6 mb-6">
            <div>
              <span className="font-semibold">Hello, {me.user?.username}!</span>
              <div className="ml-4 mt-4 mb-6 text-zinc-300">What's New?</div>
            </div>
            <div>
              <button
                onClick={() => setIsDialogOpen(true)}
                className="border border-zinc-900 hover:bg-zinc-900 transition duration-300 text-white px-3 py-2 rounded-md cursor-pointer"
              >
                New post
              </button>
            </div>
          </div>
        )}
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
          <div className="max-h-[100vh] overflow-y-auto no-scrollbar">
            {posts.map((post) => (
              <Link key={post.id} to={`/post/detail/${post.id}`}>
                <PostCard
                  id={post.id}
                  name={post.user.name}
                  createdAt={formatDistanceToNow(new Date(post.created_at), {
                    addSuffix: true,
                  })}
                  title={post.title}
                  content={post.content}
                  category_name={post.category?.name || "wepost"}
                />
              </Link>
            ))}
          </div>
        )}
        {/* Create Post Dialog */}
        <DialogPost
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      </div>
    </section>
  );
};

export default Home;
