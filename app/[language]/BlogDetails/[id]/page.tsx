"use client";
import { useEffect, useState } from "react";
import { Blog } from "@/types";
import { getblogById } from "../../../../repo/api";
import { language } from "@/types";
import Link from "next/link";

const BlogDetails = ({
  params,
}: {
  params: {
    id: string;
    language: language;
  };
}) => {
  const [blog, setBlog] = useState<Blog | null>(null);

  const getBlog = async () => {
    const fetchedBlog = await getblogById(params.id, params.language);
    if (!fetchedBlog) return;
    setBlog(fetchedBlog);
  };

  useEffect(() => {
    if (!params.id || !params.language) return;
    getBlog();
  }, [params.id, params.language]);

  if (!blog) return;

  return (
    <div className="m-10">
      <div className="bg-white">
        <div className={params.language === "en" ? "p-6" : "ARArticle p-6"}>
          <div className={params.language === "en" ? "ENHeader" : "ARHeader"}>
            <h1 className="font-bold text-2xl mb-2 text-gray-800">
              {blog.title}
            </h1>
            <div>
              <span className="inline-block rounded-full px-3 py-1 text-l font-semibold text-white bg ">
                {blog.category}
              </span>
            </div>
          </div>
          <p className="text-gray-700">{blog.data}</p>

          <h3 className="font-bold text-l m-2 text-gray-800">
            {params.language === "en" ? "More Details" : "المزيد من التفاصيل"}
          </h3>

          <p className="text-gray-700">{blog.details}</p>

          <Link
            href={params.language === "en" ? `/en?page=1` : "/ar?page=1"}
            className="mt-4 inline-flex items-center px-4 py-2 text-white bg"
          >
            {params.language === "en" ? "Back" : "العودة"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
