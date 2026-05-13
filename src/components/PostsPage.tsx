import PostCard from "./PostCard";
import { formatDistanceToNow } from "date-fns";
import { Bookmark, ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router";
import useLike from "../hooks/useLike";

// type post
type Posts = {
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

const PostsPage = ({ posts }: { posts: Posts[] }) => {
  const navigate = useNavigate();
  const { likedPosts, handlePostLike } = useLike();
  return (
    <div>
      {posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <div
              onClick={() => navigate(`/post/detail/${post.id}`)}
              key={post.id}
              className="cursor-pointer"
            >
              <PostCard
                key={post.id}
                id={post.id}
                userId={post.user.id}
                username={post.user.username}
                createdAt={formatDistanceToNow(new Date(post.created_at), {
                  addSuffix: true,
                })}
                title={post.title}
                content={post.content}
                category_name={post.category?.name || "wepost"}
              />
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
                  <Bookmark size={20} />
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        // if no posts
        <div className="text-center text-zinc-500 mt-10">
          No posts available. be the first!
        </div>
      )}
    </div>
  );
};

export default PostsPage;
