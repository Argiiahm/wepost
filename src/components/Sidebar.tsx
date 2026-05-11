import { Birdhouse, Plus, UserRound } from "lucide-react";
import { NavLink, Link } from "react-router";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import DialogPost from "../components/DialogPost";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const Sidebar = () => {
  const { me, getMe } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      await fetch(`${baseURL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
      await getMe();
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed left-0 top-0 h-screen w-72 text-white p-6">
      <div className="text-3xl">wepost.</div>
      <div className="mt-8">
        <span className="uppercase text-[10px] text-zinc-500">menu</span>
        <ul className="space-y-4 mt-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 ${
                  isActive ? "text-zinc-600 rounded-md" : ""
                }`
              }
            >
              <Birdhouse size={24} />
              <span>For you</span>
            </NavLink>
          </li>
          <li>
            {!me ? (
              <Link to="/login" className="flex items-center gap-2">
                <Plus size={24} />
                <span>New post</span>
              </Link>
            ) : (
              <button
                onClick={() => setIsDialogOpen(true)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Plus size={24} />
                <span>New post</span>
              </button>
            )}
          </li>
        </ul>
      </div>
      <div className="mt-8">
        <span className="uppercase text-[10px] text-zinc-500">Other</span>
        <ul className="space-y-4 mt-2">
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? "bg-zinc-900 p-2 rounded-md" : ""}`
              }
            >
              <UserRound size={24} />
              <span>Profile</span>
            </NavLink>
          </li>
        </ul>
      </div>
      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full border-t border-zinc-900 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-xs text-zinc-500">wepost</span>
          {!me ? (
            <Link className="font-semibold" to="/login">
              Sign in
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="font-semibold cursor-pointer"
            >
              {loading ? "wait.." : "Sign out"}
            </button>
          )}
        </div>
      </div>
      {/* Create Post Dialog */}
      <DialogPost
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </section>
  );
};

export default Sidebar;
