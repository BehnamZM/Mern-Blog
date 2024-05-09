import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import Loading from "../components/Loading";
import MainLayout from "../layouts/MainLayout";

export default function PostPage() {
  const { postSlug } = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    const getPost = async () => {
      const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
      const data = await res.json();
      setPost(data.posts[0]);
      console.log(data.posts[0]);
    };
    getPost();
  }, [postSlug]);
  return (
    <MainLayout>
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        {post ? (
          <>
            <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
              {post && post.title}
            </h1>
            <Link
              to={`/search?category=${post && post.category}`}
              className="self-center mt-5"
            >
              <button className="btn btn-outline btn-sm">
                {post && post.category}
              </button>
            </Link>
            <img
              src={post && `/src/uploads/${post.image}`}
              alt={post && post.title}
              className="mt-10 p-3 max-h-[500px] w-full object-cover"
            />
            <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
              <span>
                {post && new Date(post.createdAt).toLocaleDateString()}
              </span>
              <span className="italic">
                {/* {post && (post.content.length / 1000).toFixed(0)} دقیقه زمان مطالعه */}
                ۴ دقیقه زمان مطالعه
              </span>
            </div>
            <div
              className="p-3 max-w-2xl mx-auto w-full post-content"
              dangerouslySetInnerHTML={{ __html: post && post.content }}
            ></div>
          </>
        ) : (
          <Loading />
        )}
        <div className="max-w-4xl mx-auto w-full">
          <CommentSection postId={post._id} />
        </div>
      </main>
      ;
    </MainLayout>
  );
}
