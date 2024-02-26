import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useEffect, useRef, useState } from "react";
export const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);

  const [file, setFile] = useState(undefined);
  const [filePerc, setFirePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  const [formData, setFormData] = useState({});
  console.log(formData);

  // console.log(file);
  console.log(filePerc);
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
  return (
    <div>
      <h1 className="text-center text-3xl my-7 ">Profile</h1>

      <form action="" className="flex flex-col gap-3 max-w-lg mx-auto">
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
            <span className="text-green-700">Image Uploaded Successfully</span>
          ) : (
            ""
          )}
        </p>
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
