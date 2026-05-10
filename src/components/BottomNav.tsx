import { Birdhouse, Plus, UserRound } from "lucide-react";
import { NavLink, Link } from "react-router";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import DialogPost from "../components/DialogPost";

const BottomNav = () => {
  const { me } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-zinc-900 bg-black/90 backdrop-blur-md">
        <ul className="flex items-center justify-around p-3 text-xs text-white">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex flex-col items-center ${isActive ? "text-zinc-600" : ""}`
              }
            >
              <Birdhouse size={22} />
              <span>Home</span>
            </NavLink>
          </li>

          <li>
            {!me ? (
              <Link to="/login" className="flex flex-col items-center gap-1">
                <Plus size={22} />
                <span>Post</span>
              </Link>
            ) : (
              <button
                onClick={() => setIsDialogOpen(true)}
                className="flex flex-col items-center gap-1 cursor-pointer"
              >
                <Plus size={22} />
                <span>Post</span>
              </button>
            )}
          </li>

          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex flex-col items-center ${isActive ? "text-zinc-600" : ""}`
              }
            >
              <UserRound size={22} />
              <span>Profile</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <DialogPost
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </>
  );
};

export default BottomNav;
