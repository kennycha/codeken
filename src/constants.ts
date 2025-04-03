import { Ken, KenInsert } from "./types";

export const COLORS = {
  white: '#ffffff',
  lightGray: '#5a5f72',
  gray: '#2c303a',
  darkGray: '#131417',
  black: '#000000',
}

export const DEFAULT_KEN_FORM: Omit<KenInsert, "user_id"> = {
  title: "Untitled",
  html: "",
  css: "",
  js: "",
  tags: [],
};

export const EMPTY_KEN_LIST: { kens: Ken[]; total: number } = { kens: [], total: 0 };

export const EXTERNAL_LINKS = {
  GITHUB_PROFILE: "https://github.com/kennycha",
  GITHUB_REPOSITORY: "https://github.com/kennycha/codeken",
};

export const TAGS = []