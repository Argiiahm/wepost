import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

type props = {
  title?: string;
};

const Navbar = ({ title }: props) => {
  const { me } = useAuth();

  return (
    <header className="container max-w-3xl mx-auto mt-6 px-6 text-white flex justify-between items-center gap-2">
      <div className="text-2xl">{title}</div>
      <nav>
        <ul>
          {!me && (
            <li>
              <Link
                className="lg:hidden bg-zinc-900 px-4 py-2 rounded-md"
                to="/login"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
