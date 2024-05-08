import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [usersInfos, setUsersInfos] = useState({});
  const [postsInfos, setPostsInfos] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/user/getusers");
      const data = await res.json();
      setUsersInfos(data);
      console.log(usersInfos);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts");
      const data = await res.json();
      setPostsInfos(data);
      console.log(postsInfos);
    };
    fetchPosts();
  }, []);

  return (
    <div className="mt-8">
      <div className="grid w-full md:w-2/3 mx-auto grid-cols-2 gap-3">
        <div className=" h-24 bg-slate-300 rounded-sm flex justify-center p-4">
          <div className="flex justify-center gap-1">
            <span>تعداد کاربران:</span>
            {/* <span>{usersInfos.totalUsers}</span> */}
          </div>
        </div>
        <div className=" h-24 bg-slate-300 rounded-sm"></div>
      </div>
      <div className="grid w-full md:w-2/3 mx-auto grid-cols-2 gap-3 my-3">
        <div className="h-24 bg-slate-300 rounded-sm flex justify-center p-4">
          {/* <table className="table table-zebra">
            <thead>
              <tr>
                <th></th>
                <th>تصویر</th>
                <th>نام</th>
              </tr>
            </thead>
            <tbody>
              {usersInfos?.users.map((user, index) => (
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
          </table> */}
        </div>
      </div>
    </div>
  );
}
