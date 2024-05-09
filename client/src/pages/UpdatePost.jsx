import DashboardLayout from "../layouts/DashboardLayout";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

export default function UpdatePost() {
  const [post, setPost] = useState({});
  const { postId } = useParams();

  useEffect(() => {
    const getPost = async () => {
      const { data } = await axios.get(`/api/post/getposts?postId=${postId}`);
      setPost(data.posts[0]);
      console.log(post);
    };
    getPost();
  }, [postId]);

  const { currentUser } = useSelector((state) => state.user);
  const [title, setTitle] = useState(post.title);
  const [category, setCategory] = useState(post.category);
  const [content, setContent] = useState(post.content);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(post.image);
  const navigate = useNavigate();

  const uploadImage = async () => {
    let formData = new FormData();
    formData.append("image", image);
    try {
      const res = await axios.post("/api/post/upload", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      setImageUrl(res.data.data);
      toast.success("آپلود تصویر با موفقیت انجام شد:)");
    } catch (error) {
      toast.error(error);
    }
  };

  const updatePostHandler = async (e) => {
    e.preventDefault();
    console.log({ image: imageUrl, content, title, category });
    if (!imageUrl) {
      return toast.error("برای پست جدیدتون عکس انتخاب نکردید:(");
    }
    if (!title || !category || !content) {
      return toast.error("پر کردن تمام فیلدها الزامی هست!");
    }
    try {
      const res = await axios.put(
        `/api/post/updatepost/${post._id}/${currentUser._id}`,
        { image: imageUrl, content, title, category },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 201) {
        toast.success("پست با موفقیت آپدیت شد:)");
        // navigate(`/post/${res.data.slug}`);
      }
    } catch (error) {
      toast(error.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full my-5 flex flex-col items-center justify-center ">
        {post ? (
          <>
            <h1 className="font-extrabold text-2xl text-blue-400">
              بروزرسانی پست
            </h1>
            <form className="p-3 my-2 rounded-lg bg-blue-100 w-full lg:w-2/3  mx-auto flex flex-col items-center justify-center gap-2">
              <input
                type="text"
                placeholder="تیتر مقاله را بنویسید"
                className="input input-ghost w-full bg-white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <select
                className="select select-bordered w-full"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option disabled value="">
                  دسته بندی مقاله
                </option>
                <option value="ریکت">ریکت</option>
                <option value="تیلویند">تیلویند</option>
              </select>
              <div className="flex justify-center md:justify-between flex-wrap gap-2  w-full p-3 border-4 border-dotted border-white">
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  className="file-input file-input-bordered  w-full bg-white max-w-xs"
                />
                <button
                  className="btn bg-blue-400"
                  type="button"
                  onClick={uploadImage}
                >
                  انتخات تصویر
                </button>
              </div>
              {imageUrl && (
                <img
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "400px",
                  }}
                  src={`./src/uploads/${imageUrl}`}
                  alt=""
                />
              )}

              <ReactQuill
                theme="snow"
                className="w-full h-72"
                onChange={(value) => setContent(value)}
                value={content}
              />

              <button
                type="submit"
                className="btn btn-success mt-20 md:mt-10 w-full"
                onClick={updatePostHandler}
              >
                ایجاد پست
              </button>
            </form>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </DashboardLayout>
  );
}
