import { OrbitProgress } from "react-loading-indicators";
import usePosts from "../hooks/usePosts";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import DialogPost from "../components/DialogPost";
import PostsPage from "../components/PostsPage";

const Home = () => {
  const { me, loading: LoadingAuth } = useAuth();
  const { posts, loading: LoadingPosts, fetchPosts } = usePosts();

  const loading = LoadingAuth || LoadingPosts;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section className="container max-w-3xl h-full mx-auto p-6">
      <div className="lg:fixed h-full w-full lg:max-w-2xl lg:border border-zinc-900 lg:p-6 rounded-4xl flex flex-col">
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
          // Posts page
          <div className="overflow-y-auto no-scrollbar flex-1 pb-14">
            <PostsPage posts={posts} />
          </div>
        )}
        {/* Create Post Dialog */}
        <DialogPost
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          fetchPosts={fetchPosts}
        />
      </div>
    </section>
  );
};

export default Home;
