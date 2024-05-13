import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AllPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [postToBeDelete, setPostToBeDelete] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getAllPosts = async () => {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
      const data = await res.json();
      setPosts(data.posts);
      if (data.posts.length < 9) {
        setShowMore(false);
      }
    };
    getAllPosts();
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = posts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async (postToBeDelete) => {
    const res = await fetch(
      `/api/post/delete/${postToBeDelete}/${currentUser._id}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
    if (res.ok) {
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post._id === data._id)
      );
      // toast.success("پست مورد نظر باموفقیت حذف شد.");
      navigate(0);
    }
  };

  return (
    <div className="overflow-x-auto">
      {posts.length ? (
        <div className="flex flex-col items-center gap-4">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>تصویر</th>
                <th>تیتر</th>
                <th>موضوع</th>
                <th>تاریخ انتشار</th>
                <th>ویرایش</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {posts.map((post, index) => (
                <>
                  <tr key={post._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={`./src/uploads/${post.image}`} alt="" />
                      </div>
                    </td>
                    <td>
                      <Link to={`/post/${post.slug}`}>{post.title}</Link>
                    </td>
                    <td>{post.category}</td>
                    <td>
                      <div>{new Date(post.updatedAt).toLocaleDateString()}</div>
                    </td>
                    <td>
                      <Link to={`/update-post/${post._id}`}>
                        <button className="btn btn-sm btn-warning">
                          ویرایش
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => {
                          document.getElementById("my_modal_3").showModal();
                          setPostToBeDelete(post._id);
                        }}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                  <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                      <p className="py-4">آیا از حذف پست اطمینان دارید؟</p>
                      <div className="modal-action flex justify-center gap-6">
                        <button
                          className="btn btn-error text-white"
                          onClick={() => handleDeletePost(postToBeDelete)}
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
          <span>در حال حاضر پستی وجود ندارد!</span>
        </div>
      )}
      {/* delete post modal */}
    </div>
  );
}
