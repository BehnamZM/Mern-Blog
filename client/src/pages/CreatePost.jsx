import DashboardLayout from "../layouts/DashboardLayout";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
export default function CreatePost() {
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
          />
          <select className="select select-bordered w-full">
            <option disabled selected>
              دسته بندی مقاله
            </option>
            <option>ریکت</option>
            <option>تیلویند</option>
          </select>
          <div className="flex justify-center md:justify-between flex-wrap gap-2  w-full p-3 border-4 border-dotted border-white">
            <input
              type="file"
              className="file-input file-input-bordered  w-full bg-white max-w-xs"
            />
            <button className="btn bg-blue-400">انتخات تصویر</button>
          </div>
          <ReactQuill theme="snow" className="w-full h-72" />
          <button className="btn btn-success mt-20 md:mt-10 w-full">
            ایجاد پست
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
