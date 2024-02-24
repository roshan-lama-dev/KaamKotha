import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OAuth } from "../components/OAuth";

export const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const [errorMessage, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
      console.log(data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center my-5">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5  ">
        <input
          type="text"
          className="outline-slate-500 border p-3 rounded-md"
          placeholder="Username"
          id="username"
          onChange={handleOnChange}
        />
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
          {loading ? "Loading...." : "Sign up"}
        </button>
        <OAuth />
      </form>

      <div className="flex gap-4 mt-5">
        <span>Already have an account?</span>
        <Link to="/sign-in">
          <p className="text-blue-700 underline">Sign In</p>
        </Link>
      </div>

      {errorMessage && <p className="text-red-500 mt-5">{errorMessage}</p>}
    </div>
  );
};

// once the ui is done. time for the functionality of the form. create object using usestate to store the info from the users . then connect to the server and send the data for storing in database
// we created proxy server in vite config to connect to the server.
// used fetch method to connect, send object as a string. the recieved the respone and converted to json
// now we want to create a loading state and also error handling for the users.
