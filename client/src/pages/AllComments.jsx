import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AllComments() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async (commentIdToDelete) => {
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        toast.success("دیدگاه مورد نظر باموفقیت حذف شد.");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="overflow-x-auto">
      {comments.length ? (
        <div className="flex flex-col items-center gap-4">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>شناسه کاربر</th>
                <th>شناسه پست</th>
                <th>تعداد لایکها</th>
                <th>متن دیدگاه</th>
                <th>تاریخ انتشار</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {comments.map((comment, index) => (
                <>
                  <tr key={comment._id}>
                    <th>{index + 1}</th>
                    <td>{comment.userId}</td>
                    <td>{comment.postId}</td>
                    <td>{comment.numberOfLikes}</td>
                    <td>{comment.content}</td>
                    <td>
                      <div>
                        {new Date(comment.updatedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => {
                          document.getElementById("my_modal_4").showModal();
                          setCommentIdToDelete(comment._id);
                        }}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                  <dialog id="my_modal_4" className="modal">
                    <div className="modal-box">
                      <p className="py-4">آیا از حذف کامنت اطمینان دارید؟</p>
                      <div className="modal-action flex justify-center gap-6">
                        <form method="dialog">
                          <button
                            className="modal-action btn btn-error text-white m-0"
                            onClick={() =>
                              handleDeleteComment(commentIdToDelete)
                            }
                          >
                            بله
                          </button>
                        </form>
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn">بستن</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </>
              ))}
            </tbody>
          </table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="btn btn-outline btn-sm mb-5"
            >
              نمایش بیشتر...
            </button>
          )}
        </div>
      ) : (
        <div role="alert" className="alert alert-error text-white w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>در حال حاضر دیدگاهی وجود ندارد!</span>
        </div>
      )}
      {/* delete comment modal */}
    </div>
  );
}
