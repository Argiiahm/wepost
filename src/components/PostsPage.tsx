import { Link } from "react-router";
import PostCard from "./PostCard";
import { formatDistanceToNow } from "date-fns";
import { Bookmark, ThumbsUp } from "lucide-react";

// type post
type Posts = {
  user: {
    name: string;
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
  return (
    <div>
      {posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <div>
              <Link key={post.id} to={`/post/detail/${post.id}`}>
                <PostCard
                  id={post.id}
                  name={post.user.username}
                  createdAt={formatDistanceToNow(new Date(post.created_at), {
                    addSuffix: true,
                  })}
                  title={post.title}
                  content={post.content}
                  category_name={post.category?.name || "wepost"}
                />
              </Link>
              <div className="flex justify-between items-center border-b border-zinc-900 py-4 px-4">
                <div className="text-[14px] text-zinc-600">
                  <span>tertarik dengan postingan diatas?</span>
                </div>
                <div className="text-white flex items-center gap-2">
                  <ThumbsUp size={20} />
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
