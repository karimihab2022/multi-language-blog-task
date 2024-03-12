import { getCategories, getBlogs } from "../../repo/api";
import BlogsList from "./components/BlogsList";
import SearchBar from "./components/SearchBar";
import Paginations from "./components/Pagination";
import { language } from "@/types";
import Categories from "./components/Categories";

export default async function Home({
  params: { language },
  searchParams,
}: {
  params: { language: language };
  searchParams?: {
    search?: string;
    category?: string;
    page?: string;
  };
}) {
  const Blogs = await getBlogs(
    language,
    searchParams?.search,
    searchParams?.category,
    searchParams?.page
  );

  const categories = await getCategories(language);

  return (
    <div className=" mx-auto my-0">
      <div className="flex space-around max-w-4xl mx-auto">
        <SearchBar language={language} />
        <Categories categories={categories} language={language} />
      </div>
      <BlogsList blogs={Blogs.blogs} language={language} />
      <Paginations totalPages={Blogs.totalPages} />
    </div>
  );
}
