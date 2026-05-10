import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

const CtaLoginCard = () => {
  const { me } = useAuth();
  return (
    <div>
      {!me && (
        <div className="border border-zinc-900 px-10 py-6 mt-20 rounded-4xl text-white">
          <h1 className="text-2xl">Sign in or up for wepost.</h1>
          <span className="text-zinc-600">
            See what people are talking about and join the conversation.
          </span>
          <div className="mt-10">
            <Link to="/login">Sign in</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CtaLoginCard;
