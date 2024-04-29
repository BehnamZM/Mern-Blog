import MainLayout from "../layouts/MainLayout";
import loginImage from "../assets/login.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (!email.trim() || !username.trim() || !password.trim()) {
      toast("تمام فیلدها الزامی هستند!");
      return;
    }
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      console.log(res);
      if (res.ok) {
        toast("ثبت نام با موفقیت انجام شد");
        navigate("/signin");
      }
    } catch (error) {
      toast("مشکلی پیش اومده٬ دوباره تلاش کنید!");
      console.log(error);
    }
  };
  return (
    <MainLayout>
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:h-screen items-center">
          <div className="flex items-center justify-center order-2 md:order-1">
            <form className="w-full lg:w-2/3 flex flex-col gap-3">
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
                ثبت نام
              </button>
              <div className="flex items-center gap-2">
                <span>قبلا اکانت ساختید؟</span>
                <Link to="/signin" className="text-blue-500">
                  ورود
                </Link>
              </div>
            </form>
          </div>
          <div className="">
            <img src={loginImage} alt="login" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
