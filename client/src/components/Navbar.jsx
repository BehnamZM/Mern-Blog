import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const path = useLocation().pathname;

  const urlParams = new URLSearchParams(location.search);
  useEffect(() => {
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const signoutHandler = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      if (res.ok) {
        dispatch(signoutSuccess());
        toast("خروج با موفقیت انجام شد");
        navigate("/");
      }
    } catch (error) {
      toast(dispatch(updateFailed(error.message)));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">خانه</Link>
            </li>
            <li>
              <Link to="/signin">ورود</Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          BZMBlog
        </Link>
      </div>
      <div className=" hidden lg:flex flex-1 justify-center">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">خانه</Link>
          </li>
          <li>
            <Link to="/signin">ورود</Link>
          </li>
        </ul>
      </div>

      <div className="flex-1 gap-2 justify-end">
        <form onSubmit={submitHandler} className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        {currentUser ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={`/src/uploads/users/${currentUser.image}`}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <span className="text-center mb-3">
                خوش اومدی {currentUser.username} عزیز :)
              </span>
              {currentUser.isAdmin && (
                <li>
                  <Link to={"/dashboard?tab=admin"} className="justify-between">
                    داشبورد
                  </Link>
                </li>
              )}
              <li>
                <Link to={"/dashboard?tab=profile"} className="justify-between">
                  پروفایل
                  <span className="badge">
                    {currentUser.isAdmin ? "مدیر" : "کاربر"}
                  </span>
                </Link>
              </li>
              <li>
                <a>تنظیمات</a>
              </li>
              <li onClick={signoutHandler}>
                <span>خروج</span>
              </li>
            </ul>
          </div>
        ) : (
          <Link className="btn btn-primary btn-outline" to="/signin">
            ورود
          </Link>
        )}
      </div>
    </div>
  );
}
