import { useEffect, useState } from "react";
import MainLayout from "./layouts/MainLayout";

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getAllPosts = async () => {
      const res = await fetch("/api/post/get-all");
      const data = await res.json();
      setPosts(data);
    };
    getAllPosts();
  }, []);
  console.log(posts);

  return (
    <MainLayout>
      {posts?.map((post) => (
        <img
          key={post._id}
          width="200px"
          height="200px"
          // src={img}
          src={`./src/uploads/${post.image}`}
          alt=""
        />
      ))}
    </MainLayout>
  );
}

export default App;
