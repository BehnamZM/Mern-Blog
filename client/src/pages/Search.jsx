import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import MainLayout from "../layouts/MainLayout";
import Loading from "../components/Loading";

export default function Search() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 6) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    if (sidebarData.category !== "uncategorized") {
      urlParams.set("category", sidebarData.category);
    }
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSidebarData({ ...sidebarData, category });
    }
  };

  return (
    <MainLayout>
      <form onSubmit={handleSubmit} className="flex gap-2 justify-center my-5">
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={handleChange}
          value={sidebarData.category}
          id="category"
        >
          <option value="uncategorized">انتخاب دسته بندی</option>
          <option value="ریکت">ریکت</option>
          <option value="تیلویند">تیلویند</option>
        </select>
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={handleChange}
          value={sidebarData.sort}
          id="sort"
        >
          <option value="desc">جدیدترین</option>
          <option value="asc">قدیمی ترین</option>
        </select>
        <button type="submit" className="btn btn-outline btn-primary">
          جستجو
        </button>
      </form>
      {posts.length ? (
        <div className="flex flex-col items-center">
          <div className="w-full md:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
            {!loading ? (
              posts.map((post) => <PostCard key={post._id} post={post} />)
            ) : (
              <Loading />
            )}
          </div>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="btn btn-outline btn-sm mb-5"
            >
              نمایش بیشتر...
            </button>
          )}
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
