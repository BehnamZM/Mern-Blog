import { TiArrowLeftOutline } from "react-icons/ti";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="text-center flex flex-col gap-3 rounded-3xl shadow-2xl">
      <Link to={`/post/${post.slug}`}>
        <img
          src={`/src/uploads/${post.image}`}
          alt={post.slug}
          className="w-full h-44 sm:h-56 object-cover md:object-top rounded-t-3xl"
        />
      </Link>
      <div className="p-4 flex flex-col gap-3 items-center ">
        <h6 className="font-extrabold text-xl line-clamp-2">{post.title}</h6>
        <div className="flex items-center justify-between w-full">
          <div className="badge badge-primary badge-outline">
            {post.category}
          </div>
          <Link
            to={`/post/${post.slug}`}
            className="text-blue-950 cursor-pointer transition-all border-[1px] hover:border-white border-blue-950 hover:text-white hover:bg-green-500 p-3 rounded-full self-end text-2xl"
          >
            <TiArrowLeftOutline />
          </Link>
        </div>
      </div>
    </div>
  );
}
