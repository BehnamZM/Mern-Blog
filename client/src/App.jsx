import { useEffect, useState } from "react";
import PostCard from "./components/PostCard";
import MainLayout from "./layouts/MainLayout";

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getAllPosts = async () => {
      const res = await fetch(`/api/post/getposts`);
      const data = await res.json();
      setPosts(data.posts);
    };
    getAllPosts();
  }, []);

  return (
    <MainLayout>
      {posts.length ? (
        <div className="w-full md:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div role="alert" className="alert alert-error text-white">
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
    </MainLayout>
  );
}

export default App;
