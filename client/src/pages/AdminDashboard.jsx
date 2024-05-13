import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { FaLongArrowAltLeft } from "react-icons/fa";
export default function AdminDashboard() {
  const [usersInfos, setUsersInfos] = useState({});
  const [postsInfos, setPostsInfos] = useState({});
  const [commentsInfos, setCommentsInfos] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/user/getusers");
      const data = await res.json();
      setUsersInfos(data);
      // console.log(usersInfos);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts");
      const data = await res.json();
      setPostsInfos(data);
      // console.log(postsInfos);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch("/api/comment/getcomments");
      const data = await res.json();
      setCommentsInfos(data);
      console.log(commentsInfos);
    };
    fetchComments();
  }, []);

  return (
    <div className="mt-8">
      <div className="grid w-full mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className=" h-24 bg-slate-300 rounded-sm flex flex-col justify-center gap-2 p-4 text-lg font-semibold">
          <div className="flex  justify-center gap-1">
            <span>تعداد کاربران:</span>
            <span className="text-green-500">{usersInfos.totalUsers}</span>
          </div>
          <div className="flex justify-center gap-1 text-[10px]">
            <span>ثبت نام در ماه گذشته:</span>
            <span>{usersInfos.lastMonthUsers}</span>
          </div>
        </div>
        <div className=" h-24 bg-slate-300 rounded-sm flex flex-col justify-center gap-2 p-4 text-lg font-semibold">
          <div className="flex  justify-center gap-1">
            <span>تعداد پستها:</span>
            <span className="text-green-500">{postsInfos.totalPosts}</span>
          </div>
          <div className="flex justify-center gap-1 text-[10px]">
            <span>تعداد پست ها در ماه گذشته</span>
            <span>{postsInfos.lastMonthPosts}</span>
          </div>
        </div>
        <div className=" h-24 bg-slate-300 rounded-sm flex flex-col justify-center gap-2 p-4 text-lg font-semibold">
          <div className="flex  justify-center gap-1">
            <span>تعداد کامنتها:</span>
            <span className="text-green-500">
              {commentsInfos.totalComments}
            </span>
          </div>
          <div className="flex justify-center gap-1 text-[10px]">
            <span>تعداد کامنت ها در ماه گذشته</span>
            <span>{commentsInfos.lastMonthComments}</span>
          </div>
        </div>
      </div>
      <div className="grid  mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-3">
        <div className=" bg-slate-300 rounded-sm flex justify-center p-4">
          {usersInfos.users ? (
            <div className="w-full flex flex-col justify-between">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th></th>
                    <th>تصویر</th>
                    <th>نام</th>
                  </tr>
                </thead>
                <tbody>
                  {usersInfos?.users.slice(0, 5).map((user, index) => (
                    <>
                      <tr key={user._id}>
                        <th>{index + 1}</th>
                        <td>
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={`./src/uploads/users/${user.image}`}
                              alt="user"
                            />
                          </div>
                        </td>
                        <td>
                          <div>{user.username}</div>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
              <Link
                to={"/dashboard?tab=users"}
                className="flex items-center justify-center gap-2 text-blue-500 font-thin"
              >
                <span>مشاهده همه کاربران</span>
                <FaLongArrowAltLeft />
              </Link>
            </div>
          ) : (
            <Loading />
          )}
        </div>
        <div className=" bg-slate-300 rounded-sm flex justify-center p-4">
          {postsInfos.posts ? (
            <div className="w-full flex flex-col justify-between">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th></th>
                    <th>تصویر</th>
                    <th>نام</th>
                  </tr>
                </thead>
                <tbody>
                  {postsInfos?.posts.slice(0, 5).map((post, index) => (
                    <>
                      <tr key={post._id}>
                        <th>{index + 1}</th>
                        <td>
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={`./src/uploads/${post.image}`}
                              alt="post"
                            />
                          </div>
                        </td>
                        <td>
                          <Link to={`/post/${post.slug}`}>{post.title}</Link>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
              <Link
                to={"/dashboard?tab=posts"}
                className="flex items-center justify-center gap-2 text-blue-500 font-thin"
              >
                <span>مشاهده همه پستها</span>
                <FaLongArrowAltLeft />
              </Link>
            </div>
          ) : (
            <Loading />
          )}
        </div>
        <div className=" bg-slate-300 rounded-sm flex justify-center p-4">
          {commentsInfos.comments ? (
            <div className="w-full flex flex-col justify-between">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th></th>
                    <th>متن کامنت</th>
                    <th>تعدادلایکها</th>
                  </tr>
                </thead>
                <tbody>
                  {commentsInfos?.comments
                    .splice(0, 9)
                    .map((comment, index) => (
                      <>
                        <tr key={comment._id}>
                          <th>{index + 1}</th>
                          <td>
                            <div className="line-clamp-1">
                              {comment.content}
                            </div>
                          </td>
                          <td>
                            <div className="">{comment.numberOfLikes}</div>
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
              </table>
              <Link
                to={"/dashboard?tab=comments"}
                className="flex items-center justify-center gap-2 text-blue-500 font-thin"
              >
                <span>مشاهده همه کامنتها</span>
                <FaLongArrowAltLeft />
              </Link>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
}
