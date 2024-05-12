import moment from "moment";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns-jalali";
import { GrLike } from "react-icons/gr";
import { useSelector } from "react-redux";

export default function Comment({ comment, onLike }) {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);
  return (
    <div className="flex gap-3 p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={`/src/uploads/users/${user.image}`}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex gap-2 items-center mb-1">
          <span className="font-bold text-sm truncate">
            {user ? `${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {/* {moment(comment.createdAt).fromNow()} */}
            {formatDistanceToNow(comment.createdAt)} قبل
          </span>
        </div>
        <p className="text-gray-500 pb-2">{comment.content}</p>
        <div
          className={`flex gap-2 mt-3 ${
            currentUser && comment.likes.includes(currentUser._id)
              ? "text-green-800"
              : "text-gray-400"
          }`}
        >
          <GrLike
            className=" cursor-pointer"
            onClick={() => onLike(comment._id)}
          />
          <span>{comment.numberOfLikes > 0 && comment.numberOfLikes}</span>
        </div>
      </div>
    </div>
  );
}
