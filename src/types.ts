export type Ken = {
  id: number;
  title: string;
  html: string;
  css: string;
  js: string;
  tags: string[];
  created_at: string;
  updated_at: string;
};

export type KenInsert = Omit<Ken, "id" | "created_at" | "updated_at">;

export type KenUpdate = { id: number } & Partial<KenInsert>;
