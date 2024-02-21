export const SignIn = () => {
  return (
    <div className=" justify-center py-44 flex-col bg-slate-200 ">
      <div className="">
        <p className="text-3xl text-center my-4">Sign In</p>
        <form className="flex flex-col gap-5 justify-center items-center ">
          <input
            type="text"
            className="outline-slate-500 p-3 rounded-md"
            placeholder="Email"
          />
          <input
            type="password"
            className="outline-slate-500 p-3 rounded-md"
            placeholder="Password"
          />
          <input
            type="password"
            className="outline-slate-500 p-3 rounded-md"
            placeholder="Password"
          />
          <button className="bg-slate-700 p-3 rounded-md text-white uppercase ">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
