"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "flowbite-react";

export default function Paginations({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const { replace } = useRouter();

  const handleChange = (value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", value.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex overflow-x-auto justify-center mb-5 max-w-4xl mx-auto ">
      <Pagination
        className="pagination"
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handleChange}
      />
    </div>
  );
}
