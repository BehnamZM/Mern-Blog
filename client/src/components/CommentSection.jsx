import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
export default function CommentSection({ postId }) {
  const [comment, setComment] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [commentError, setCommentError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        toast.success("دیدگاه شما با موفقیت ارسال شد:)");
      }
    } catch (error) {
      setCommentError(error.message);
      toast.error(commentError);
    }
  };
  return (
    <div>
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>وارد شده با:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={`/src/uploads/users/${currentUser.image}`}
            alt=""
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          برای ارسال دیدگاه باید وارد شوید
          <Link className="text-blue-500 hover:underline" to={"/signin"}>
            ورود
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-blue-300 border-dashed rounded-md p-3"
        >
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="دیدگاه شما"
            className="textarea textarea-bordered textarea-lg w-full"
          ></textarea>
          <div className="flex justify-between items-center mt-5">
            <button className="btn btn-outline" type="submit">
              ارسال
            </button>
            <p className="text-gray-500 text-xs">
              حداکثر کاراکتر: {200 - comment.length}
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
