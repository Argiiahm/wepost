import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, Bookmark, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { OrbitProgress } from "react-loading-indicators";
import { useNavigate, useParams } from "react-router";
import PostCard from "../../components/PostCard";
import useLike from "../../hooks/useLike";
import useFav from "../../hooks/useFav";
const baseURL = import.meta.env.VITE_API_BASE_URL;

type UserProfileType = {
  id: number;
  name: string;
  username: string;
  bio: string;
  posts: {
    id: number;
    title: string;
    content: string;
    created_at: string;
  }[];
};

const UserProfile = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { likedPosts, handlePostLike } = useLike();
  const { FavPosts, handleFavPosts } = useFav();

  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseURL}/user/${id}`);
        const data = await res.json();
        setUserProfile(data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [id]);

  return (
    <section className="container max-w-3xl h-full mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-white cursor-pointer mb-4"
      >
        <div className="flex items-center gap-2">
          <ArrowLeft size={14} />
          <span>Back</span>
        </div>
      </button>
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
              <h1 className="text-2xl text-white font-bold">
                {userProfile?.name}
              </h1>

              <span className="text-zinc-500">{userProfile?.username}</span>
            </div>

            <img
              className="w-16 h-16 rounded-full"
              src={`https://ui-avatars.com/api/?name=${userProfile?.name}&background=random`}
            />
          </div>

          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold text-white">Posts</h2>

            {userProfile?.posts.length === 0 ? (
              <p className="text-zinc-500">No posts yet.</p>
            ) : (
              userProfile?.posts.map((post: any) => (
                <div key={post.id}>
                  <div>
                    <PostCard
                      userId={userProfile.id}
                      username={userProfile?.username}
                      title={post.title}
                      content={post.content}
                      createdAt={formatDistanceToNow(
                        new Date(post.created_at),
                        {
                          addSuffix: true,
                        },
                      )}
                      id={post.id}
                      category_name={post.category?.name || "wepost"}
                    />
                  </div>
                  <div className="flex justify-between items-center border-b border-zinc-900 py-4 px-4">
                    <div className="text-[14px] text-zinc-600">
                      <span>tertarik dengan postingan diatas?</span>
                    </div>
                    <div className="text-white flex items-center gap-2">
                      <ThumbsUp
                        color={likedPosts.includes(post!.id) ? "red" : "white"}
                        fill={likedPosts.includes(post!.id) ? "red" : "none"}
                        // stop event propagation to prevent navigating to post detail when clicking like button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePostLike(post!.id);
                        }}
                        size={20}
                      />
                      <Bookmark
                        fill={FavPosts.includes(post!.id) ? "white" : "none"}
                        // stop event propagation to prevent navigating to post detail when clicking like button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFavPosts(post!.id);
                        }}
                        size={20}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default UserProfile;
