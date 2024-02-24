import { useSelector } from "react-redux";
export const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <h1 className="text-center text-3xl my-7 ">Profile</h1>

      <form action="" className="flex flex-col gap-3 max-w-lg mx-auto">
        <input type="text" />
        <img
          src={currentUser.avatar}
          className="rounded-full w-24 l-24 self-center object-cover"
          alt="test"
        />
        <input
          type="text"
          className="p-3 rounded-l "
          placeholder="Username"
          value={currentUser.username}
        />
        <input type="text" className="p-3 rounded-l " placeholder="Email" />
        <input type="text" className="p-3 rounded-l " placeholder="Email" />
        <button className="p-3 bg-slate-500 rounded-lg text-white uppercase">
          Submit
        </button>

        <div className="flex justify-between">
          <span>Delete Account</span>
          <span>Logout</span>
        </div>
      </form>
    </div>
  );
};
