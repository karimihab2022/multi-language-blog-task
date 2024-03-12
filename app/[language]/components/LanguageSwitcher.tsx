"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import langImg from "../../../public/lang.jpg";
import { i18n } from "../../../lang.config";

const LanguageSwitcher = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const redirectedToLang = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    const params = new URLSearchParams(searchParams);
    if (params.has("search")) {
      params.delete("search");
    }
    if (params.has("category")) {
      params.delete("category");
    }
    if (!params.has("page") && segments.length < 3) params.set("page", "1");
    return segments.join("/").concat(`?${params.toString()}`);
  };

  return (
    <div className="flex">
      <Image
        src={langImg}
        alt="Lang"
        width={25}
        height={25}
        priority
        className="mx-2"
      />
      <ul className="flex space-x-4 ">
        {i18n.locales.map((locale) => {
          return (
            <li key={locale}>
              <Link
                href={redirectedToLang(locale)}
                className="p-2 text-white hover:bg-gray-600 "
              >
                {locale}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
