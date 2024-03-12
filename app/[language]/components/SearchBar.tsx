"use client";

import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { language } from "@/types";
import { useDebouncedCallback } from "use-debounce";

const SearchBar = ({ language }: { language: language }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    setSearchTerm(term);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
      params.set("page", "1");
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 100);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder={language === "en" ? "Search by title" : "ابحث بالعنوان"}
      className="p-1.5 border border-gray-300 rounded text-black my-auto h-fit-content"
    />
  );
};

export default SearchBar;
