import { mutate } from "swr";
import { updateKen } from "../services/ken";
import { KenUpdate } from "../types";

export default function useEditKen() {
  const editKen = async (ken: KenUpdate) => {
    const updated = await updateKen(ken);

    mutate(["kens", ken.id], updated);

    return updated;
  };

  return { editKen };
}
