import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { OAuth } from "../components/OAuth";
export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  // const [errorMessage, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // before request we set the loading to true
    try {
      // setLoading(true);
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        // setError(data.message);
        // setLoading(false);
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      // setLoading(false);
      // setError(null);
      navigate("/");
      console.log(data);
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center my-5">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5  ">
        <input
          type="email"
          className="outline-slate-500 border p-3 rounded-md"
          placeholder="Email"
          id="email"
          onChange={handleOnChange}
        />
        <input
          type="password"
          className="outline-slate-500 border p-3 rounded-md"
          placeholder="Password"
          id="password"
          onChange={handleOnChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 p-3 rounded-md text-white uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading...." : "Sign In"}
        </button>
        <OAuth />
      </form>

      <div className="flex gap-4 mt-5">
        <span>Don&apos;t have an account?</span>
        <Link to="/sign-up">
          <p className="text-blue-700 underline">Sign Up</p>
        </Link>
      </div>

      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};
