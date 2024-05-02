import { FaHouseUser } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="flex items-center">
      <ul className="menu bg-base-200 rounded-box flex flex-row md:flex-col justify-center items-center w-full md:w-fit">
        <li>
          <Link
            to={"/dashboard?tab=profile"}
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
            data-tip="تنظیمات"
          >
            <IoSettings className="w-7 h-7 text-blue-950" />
          </Link>
        </li>
        <li>
          <Link
            to={"/dashboard?tab=profile"}
            className="tooltip tooltip-top md:tooltip-left"
            data-tip="خروج"
          >
            <RiLogoutCircleRFill className="w-7 h-7 text-blue-950" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
