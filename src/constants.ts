import { Ken, KenInsert } from "./types";

export const COLORS = {
  white: '#ffffff',
  lightGray: '#575c6c',
  gray: '#444857',
  darkGray: '#2d2d2d',
  black: '#1e1e1e',
  primary: '#3467FE',
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

export const TAGS = [
  '3D',
  'Audio',
  'Animation',
  'CSS',
  'Game',
  'Shader',
  'SVG',
]