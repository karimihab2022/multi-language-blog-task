"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { language } from "@/types";
import { useState, useEffect } from "react";

const Categories = ({
  categories,
  language,
}: {
  categories: string[];
  language: language;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedCategory) {
      params.set("category", selectedCategory);
      params.set("page", "1");
    } else {
      params.delete("category");
    }

    replace(`${pathname}?${params.toString()}`);
  }, [selectedCategory]);

  return (
    <div className="flex py-10 w-30">
      <div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="block w-full py-2 px-3  rounded-md "
        >
          <option value="">
            {language === "en" ? "All Categories" : "جميع الفئات"}
          </option>
          {categories.map((category: string) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Categories;
