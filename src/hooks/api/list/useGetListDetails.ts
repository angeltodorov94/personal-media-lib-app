import { api } from "@/lib/axios";
import { baseURLV4 } from "@/lib/constants";
import { ListDetails } from "@/types/list";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

async function queryFn(pageParam: number): Promise<ListDetails> {
  // Lists only exist on TMDB v4, so override the client's default v3 baseURL
  const { data } = await api.get<ListDetails>(`list/8701874`, {
    baseURL: baseURLV4,
    params: {
      page: pageParam,
    },
  });

  return data;
}

export function useGetListDetails() {
  return useInfiniteQuery<
    ListDetails,
    Error,
    InfiniteData<ListDetails>,
    unknown[],
    number
  >({
    queryKey: ["list-details", "8701874"],
    queryFn: ({ pageParam }) => queryFn(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
  });
}
