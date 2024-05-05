import DashboardLayout from "../layouts/DashboardLayout";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
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
      toast("آپلود تصویر با موفقیت انجام شد:)");
    } catch (error) {
      toast(error);
    }
  };
  const uploadPost = async (e) => {
    e.preventDefault();
    if (!imageUrl) {
      return toast("برای پست جدیدتون عکس انتخاب نکردید:(");
    }
    if (!title || !category || !content) {
      return toast("پر کردن تمام فیلدها الزامی هست!");
    }
    try {
      const res = await axios.post(
        "/api/post/create",
        { image: imageUrl, content, title, category },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast("پست با موفقیت ایجاد شد:)");
      navigate("/");
    } catch (error) {
      toast(error.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full my-5 flex flex-col items-center justify-center ">
        <h1 className="font-extrabold text-2xl text-blue-400">
          افزودن پست جدید
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
              // src={img}
              src={`./src/uploads/${imageUrl}`}
              alt=""
            />
          )}

          {/* <ReactQuill theme="snow" className="w-full h-72"/> */}
          <input
            type="text"
            placeholder="متن مقاله را بنویسید"
            className="input input-ghost w-full bg-white"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-success mt-20 md:mt-10 w-full"
            onClick={uploadPost}
          >
            ایجاد پست
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
