import { FilterOptions, Ken, KenInsert, KenUpdate, PaginationOptions } from "../types";
import { supabase } from "./client";

export const getKens = async ({ page, size, tag }: FilterOptions & PaginationOptions) => {
  const from = (page - 1) * size;
  const to = from + size - 1;

  let query = supabase.from("kens").select("*", { count: "exact" }).order("created_at", { ascending: false });

  if (tag) {
    query = query.contains("tags", tag);
  }

  const { data, count, error } = await query.range(from, to);

  if (error) {
    throw error;
  }

  return { kens: data as Ken[], total: count ?? 0 };
};

export const getKen = async (id: number) => {
  const { data, error } = await supabase.from("kens").select("*").eq("id", id).single();

  if (error) {
    throw error;
  }

  return data as Ken;
};

export const createKen = async (ken: KenInsert) => {
  const { data, error } = await supabase.from("kens").insert(ken);

  if (error) {
    throw error;
  }

  return data;
};

export const updateKen = async (ken: KenUpdate) => {
  const { data, error } = await supabase.from("kens").update(ken).eq("id", ken.id);

  if (error) {
    throw error;
  }

  return data;
};

export const deleteKen = async (id: number) => {
  const { error } = await supabase.from("kens").delete().eq("id", id);

  if (error) {
    throw error;
  }
};
