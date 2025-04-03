export type Ken = {
  id: number;
  title: string;
  html: string;
  css: string;
  js: string;
  tags: string[];
  user_id: string;
  created_at: string;
  updated_at: string;
};

export type KenInsert = Omit<Ken, "id" | "created_at" | "updated_at">;

export type KenUpdate = { id: number, user_id: string } & Partial<KenInsert>;

export type FilterOptions = {
  tag: string | null;
};

export type PaginationOptions = {
  page: number;
  size: number;
};
