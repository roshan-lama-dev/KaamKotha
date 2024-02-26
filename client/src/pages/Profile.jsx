import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useEffect, useRef, useState } from "react";

import {
  updateUserStart,
  updateFailure,
  updateSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
export const Profile = () => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [file, setFile] = useState(undefined);
  const [filePerc, setFirePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [updateUserSuccess, setUpdateSuccess] = useState(false);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      // send the file to the function
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);

    // create a unique name for the filename by adding the current time with the filename
    const fileName = new Date().getTime() + file.name;

    // create a storage reference
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFirePerc(Math.round(progress));
      },
      // console.log("Upload is " + progress + "% done");

      // error handling

      (error) => {
        console.log(error);
        setFileUploadError(true);
      },

      //get the downloadUrl in a state so that we can update the form.
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateFailure(data.message));
        return;
      }
      dispatch(updateSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  // console.log(formData);
  return (
    <div>
      <h1 className="text-center text-3xl my-7 ">Profile</h1>

      <form
        onSubmit={handleSubmit}
        action=""
        className="flex flex-col gap-3 max-w-lg mx-auto"
      >
        {/* create a input with file type. Make use of useRef to reference the input towards the image */}

        {/* after creating the storage rule for the firebase  */}
        <input
          onChange={(e) => setFile(e.target.files[0])}
          className=""
          hidden
          accept="image/*"
          type="file"
          ref={fileRef}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          className="rounded-full w-24 h-24 self-center cursor-pointer object-cover "
          alt="test"
        />

        <p className="self-center text-sm">
          {fileUploadError ? (
            <span className="text-red-500">Image Upload Error</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700 text-sm">
              Image Uploaded Successfully. Please press update to save changes.
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          className="p-3 rounded-l "
          placeholder="Username"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleOnChange}
        />
        <input
          id="email"
          type="email"
          defaultValue={currentUser?.email}
          className="p-3 rounded-l "
          placeholder="Email"
          onChange={handleOnChange}
        />
        <input
          id="password"
          type="password"
          className="p-3 rounded-l "
          placeholder="Password"
          defaultValue={currentUser.password}
          onChange={handleOnChange}
        />
        <button
          disabled={loading}
          className="p-3 bg-slate-500 rounded-lg text-white uppercase"
        >
          {loading ? `Loading....` : "Update"}
        </button>

        <div className="flex justify-between">
          <span>Delete Account</span>
          <span>Logout</span>
        </div>

        <p className="text-red-700">{error ? error : ""}</p>
        <p className="text-green-700">
          {updateUserSuccess ? "User updated Successfully" : ""}
        </p>
      </form>
    </div>
  );
};
