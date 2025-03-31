import { Ken, KenInsert, KenUpdate } from "../types";
import { supabase } from "./client";

export const getKens = async () => {
  const { data, error } = await supabase
    .from("kens")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data as Ken[];
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
