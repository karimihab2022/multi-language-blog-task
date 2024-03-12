// import 'server-only'
import { Blog } from "@/types";
import { language } from "../types/index";

const blogs = {
  en: async () => {
    const module = await import("./data/blogs_en.json");
    return module.default;
  },
  ar: async () => {
    const module = await import("./data/blogs_ar.json");
    return module.default;
  },
};

export const getBlogs = async (
  lang: language,
  searchTerm: string = "",
  category: string = "",
  page: string = ""
): Promise<{ blogs: Blog[]; totalPages: number }> => {
  const pagesize = 6;
  const allblogs = await blogs[lang]();

  const startIndex = (Number(page) - 1) * pagesize;
  const endIndex = startIndex + pagesize;
  if (!searchTerm && !category) {
    return {
      blogs: allblogs.slice(startIndex, endIndex),
      totalPages: Math.ceil(allblogs.length / pagesize),
    };
  }

  const filteredPosts = allblogs.filter((blog) => {
    const matchesSearchQuery = searchTerm
      ? blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesCategory = category
      ? blog.category.toLowerCase() === category.toLowerCase()
      : true;

    return matchesSearchQuery && matchesCategory;
  });
  return {
    blogs: filteredPosts.slice(startIndex, endIndex),
    totalPages: Math.ceil(filteredPosts.length / pagesize),
  };
};
export const getCategories = async (lang: language): Promise<string[]> => {
  const allblogs = await blogs[lang]();
  const uniquecategorys = new Set(allblogs.map((blog) => blog.category));

  // Convert the Set back to an array
  const uniquecategorysArray = Array.from(uniquecategorys);
  return uniquecategorysArray;
};

export const getblogById = async (
  id: string,
  lang: language
): Promise<Blog | undefined> => {
  const allblogs = await blogs[lang]();
  return allblogs.find((blog) => blog.id.toString() === id);
};
