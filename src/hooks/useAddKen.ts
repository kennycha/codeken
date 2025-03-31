import { mutate } from "swr";
import { createKen } from "../services/ken";
import { KenInsert } from "../types";

export default function useAddKen() {
  const addKen = async (ken: KenInsert) => {
    const created = await createKen(ken);

    mutate("kens");

    return created;
  };

  return { addKen };
}
