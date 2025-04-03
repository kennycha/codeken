import useSWR from "swr";
import { getKen } from "../services/ken";
import { Ken } from "../types";

export default function useGetKen(id?: number) {
  return useSWR<Ken>(
    id ? ["kens", id] : null,
    id ? () => getKen(id) : null
  );
}
