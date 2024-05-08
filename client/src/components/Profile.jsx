import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailed,
} from "../redux/user/userSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState(currentUser.password);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  const navigate = useNavigate();

  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (!email || !username) {
      toast("تمام فیلدها الزامی هستند!");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          image: imageFileUrl,
        }),
      });
      console.log(res);
      const data = await res.json();
      if (res.ok) {
        dispatch(updateSuccess(data));
        toast.success("بروزرسانی با موفقیت انجام شد");
        navigate(0);
      }
    } catch (error) {
      toast.error(dispatch(updateFailed(error.message)));
    }
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", imageFile);
    try {
      const res = await axios.post("/api/user/upload", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      setImageFileUrl(res.data.data);
      toast.success("آپلود تصویر با موفقیت انجام شد:)");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFileUrl) {
    }
    console.log(imageFileUrl);
  }, [imageFileUrl]);

  return (
    <div className="flex items-center justify-center h-full">
      <form className="w-full md:w-2/3 flex flex-col gap-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleChangeImage}
          className="hidden"
          ref={filePickerRef}
        />
        <div
          className="w-24 h-24 self-center cursor-pointer"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            className="w-full h-full rounded-full border-[6px] border-blue-200 object-cover"
            src={
              imageFileUrl
                ? imageFileUrl
                : `./src/uploads/users/${currentUser.image}`
            }
            alt="avatar"
          />
        </div>
        <button className="btn btn-outline btn-sm " onClick={uploadImage}>
          آپلودتصویر
        </button>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="نام کاربری"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="ایمیل"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="رمزعبور"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <button
          onClick={submitFormHandler}
          className="btn bg-blue-500 text-white hover:bg-blue-700"
        >
          بروزرسانی
        </button>
        {currentUser.isAdmin && (
          <Link to="/create-post">
            <button className="btn bg-fuchsia-600 text-white hover:bg-fuchsia-700 w-full">
              ایجاد پست
            </button>
          </Link>
        )}
      </form>
    </div>
  );
}
