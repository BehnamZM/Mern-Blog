import React, { useEffect, useState } from "react";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getAllPosts = async () => {
      const res = await fetch("/api/post/getposts");
      const data = await res.json();
      setPosts(data.posts);
    };
    getAllPosts();
  }, []);
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>تصویر</th>
            <th>تیتر</th>
            <th>موضوع</th>
            <th>ویرایش</th>
            <th>حذف</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {posts.map((post, index) => (
            <tr key={post._id}>
              <th>{index + 1}</th>
              <td>
                <div className="mask mask-squircle w-12 h-12">
                  <img src={`./src/uploads/${post.image}`} alt="" />
                </div>
              </td>
              <td>{post.title}</td>
              <td>{post.category}</td>
              <td>
                <button className="btn btn-sm btn-warning">ویرایش</button>
              </td>
              <td>
                <button className="btn btn-sm btn-error">حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
