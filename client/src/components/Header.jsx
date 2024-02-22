import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
export const Header = () => {
  return (
    <nav className="p-4 bg-slate-700 text-white shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-3xl text-bold">LOGO</span>

        <form
          className="flex p-3 rounded-lg justify-center items-center gap-2 bg-slate-200"
          action="
        "
        >
          <input
            className="bg-transparent outline-none text-black  rounded-md"
            type="text"
            placeholder="Search"
          />
          <button>
            <FaSearch className="text-2xl text-slate-700" />
          </button>
        </form>
        <ul className="flex items-center gap-3">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/sign-in">
            <li>Sign In</li>
          </Link>
          <Link to="/sign-up">
            <li>Sign Up</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};
