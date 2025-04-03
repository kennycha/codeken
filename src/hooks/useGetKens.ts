import useSWR from "swr";
import { getKens } from "../services/ken";
import { FilterOptions, Ken, PaginationOptions } from "../types";

export default function useGetKens({ page, size, tag }: FilterOptions & PaginationOptions) {
  return useSWR<{ kens: Ken[]; total: number }>({
    key: ["kens", page, size, tag],
    fetcher: () => getKens({ page, size, tag }),
  });
}
