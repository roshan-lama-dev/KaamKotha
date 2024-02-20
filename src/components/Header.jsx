import { Link } from "react-router-dom";
export const Header = () => {
  return (
    <nav className="p-4 bg-slate-100 shadow-sm">
      <div className="flex items-center justify-between">
        <span>LOGO</span>
        <input type="text" placeholder="Search" />
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
          <Link to="/sign-out">
            <li>Sign Up</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};
