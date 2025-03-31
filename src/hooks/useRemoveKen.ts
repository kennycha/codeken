import { mutate } from "swr";
import { deleteKen } from "../services/ken";

export default function useRemoveKen() {
  const removeKen = async (id: number) => {
    await deleteKen(id);

    mutate("kens");
  };

  return { removeKen };
}
