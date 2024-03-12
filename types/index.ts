import { i18n } from "@/lang.config";

export interface Blog {
  id: number;
  title: string;
  data: string;
  category: string;
  thumbnail: string;
  details: string;
}

export type language = (typeof i18n)["locales"][number];
