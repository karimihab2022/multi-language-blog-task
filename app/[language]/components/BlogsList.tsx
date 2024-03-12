import Link from "next/link";
import { Blog, language } from "@/types";

const BlogsList = ({
  blogs,
  language,
}: {
  blogs: Blog[];
  language: language;
}) => {
  if (!blogs) return null;
  return (
    <div className="blogs-container">
      {blogs.map((blog) => (
        <div
          className="blogs"
          style={{
            backgroundImage: `url("${blog.thumbnail})`,
          }}
        >
          <Link href={`${language}/BlogDetails/${blog.id}`} passHref>
            <div key={blog.id}>
              <div className={language === "en" ? "p-6" : "ARArticle p-6"}>
                <div className={language === "en" ? "ENHeader" : "ARHeader"}>
                  <h2 className="font-bold text-3xl mb-2 text-white">
                    {blog.title}
                  </h2>
                  <div>
                    <span className="inline-block rounded-full px-3 py-1 text-m font-semibold text-white bg ">
                      {blog.category}
                    </span>
                  </div>
                </div>
                <p className="text-white text-xl">{blog.data}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogsList;
