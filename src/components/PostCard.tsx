import { Link } from "react-router";

type Props = {
  id: number;
  userId: number;
  username: string;
  createdAt: string;
  title: string;
  content: string;
  category_name: string;
};

const PostCard = ({
  id,
  userId,
  username,
  createdAt,
  title,
  content,
  category_name,
}: Props) => {
  return (
    <div
      key={id}
      className="md:border border-b border-zinc-900 sm:pb-6 md:rounded-md md:px-6 py-2 mt-2"
    >
      <div className="flex flex-wrap gap-2">
        <Link
          onClick={(e) => e.stopPropagation()}
          className="flex gap-2"
          to={`/profile/${userId}`}
        >
          <img
            className="w-10 h-10 rounded-full"
            src={`https://ui-avatars.com/api/?name=${username}&background=random`}
          />
          <div>
            <div className="text-white capitalize hover:underline">
              {username}
            </div>
            <div className="text-zinc-800 lowercase">{category_name}</div>
          </div>
        </Link>
        <span className="text-zinc-500">{createdAt}</span>
      </div>
      <h1 className="text-white text-xl font-bold mt-4">{title}</h1>
      <p className="text-zinc-400 mt-2">{content}</p>
    </div>
  );
};

export default PostCard;
