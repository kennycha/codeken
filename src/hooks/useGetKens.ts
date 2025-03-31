import useSWR from "swr";
import { getKens } from "../services/ken";
import { Ken } from "../types";

export default function useGetKens() {
  return useSWR<Ken[]>({
    key: ["kens"],
    fetcher: getKens,
  });
}
