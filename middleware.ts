import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./lang.config";
import { language } from "./types/index";

const getBrowserLanguage = (req: NextRequest) => {
  const lang = req.headers
    .get("accept-language")
    ?.split(",")
    .map((i) => i.split(";"))
    ?.reduce(
      (ac: { code: string; priority: string }[], lang) => [
        ...ac,
        { code: lang[0], priority: lang[1] },
      ],
      []
    )
    ?.sort((a, b) => (a.priority > b.priority ? -1 : 1))
    ?.find((i) => i18n.locales.includes(i.code.substring(0, 2) as language))
    ?.code?.substring(0, 2);
  return lang;
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  const searchParams = request.nextUrl.searchParams;
  const segments = pathname.split("/");
  const pathMissingPage = !searchParams.has("page") && segments.length < 3;
  const locale = getBrowserLanguage(request);

  if (pathnameIsMissingLocale && pathMissingPage) {
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}/?page=1`,
        request.url
      )
    );
  }
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }
  if (pathMissingPage) {
    return NextResponse.redirect(new URL(`${pathname}/?page=1`, request.url));
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
