import { FaHouseUser } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineNoAccounts, MdOutlinePostAdd } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { TbLogs } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteStart,
  deleteSuccess,
  deleteFailed,
  signoutSuccess,
} from "../redux/user/userSlice";

export default function Sidebar() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteAcountHandler = async () => {
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      console.log(res);
      if (res.ok) {
        dispatch(deleteSuccess());
        toast("حذف اکانت با موفقیت انجام شد");
        navigate("/");
      }
    } catch (error) {
      toast(dispatch(updateFailed(error.message)));
    }
  };
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
  return (
    <>
      <div className="flex items-center">
        <ul className="menu bg-base-200 rounded-box flex flex-row md:flex-col justify-center items-center w-full md:w-fit">
          <li>
            <Link
              to={"/dashboard?tab=admin"}
              className="tooltip tooltip-top md:tooltip-left"
              data-tip="داشبورد"
            >
              <FaHouseUser className="w-7 h-7 text-blue-950" />
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboard?tab=profile"}
              className="tooltip tooltip-top md:tooltip-left"
              data-tip="داشبورد"
            >
              <ImProfile className="w-7 h-7 text-blue-950" />
            </Link>
          </li>
          {currentUser.isAdmin && (
            <>
              <li>
                <Link
                  to={"/create-post"}
                  className="tooltip tooltip-top md:tooltip-left"
                  data-tip="ایجاد پست"
                >
                  <MdOutlinePostAdd className="w-7 h-7 text-blue-950" />
                </Link>
              </li>
              <li>
                <Link
                  to={"/dashboard?tab=posts"}
                  className="tooltip tooltip-top md:tooltip-left"
                  data-tip="همه پستها"
                >
                  <TbLogs className="w-7 h-7 text-blue-950" />
                </Link>
              </li>
            </>
          )}
          <li onClick={() => document.getElementById("my_modal_2").showModal()}>
            <Link
              to={"/dashboard?tab=profile"}
              className="tooltip tooltip-top md:tooltip-left"
              data-tip="خروج"
            >
              <RiLogoutCircleRFill className="w-7 h-7 text-blue-950" />
            </Link>
          </li>
          <li onClick={() => document.getElementById("my_modal_1").showModal()}>
            <div
              className="tooltip tooltip-top md:tooltip-left"
              data-tip="حذف حساب کاربری"
            >
              <MdOutlineNoAccounts className="w-7 h-7 text-blue-950" />
            </div>
          </li>
        </ul>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <p className="py-4">آیا از حذف اکانت خود اطمینان دارید؟</p>
          <div className="modal-action flex justify-center gap-6">
            <button
              className="btn btn-error text-white"
              onClick={deleteAcountHandler}
            >
              بله
            </button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">بستن</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <p className="py-4">آیا از خروج خود اطمینان دارید؟</p>
          <div className="modal-action flex justify-center gap-6">
            <button
              className="btn btn-error text-white"
              onClick={signoutHandler}
            >
              بله
            </button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">بستن</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
