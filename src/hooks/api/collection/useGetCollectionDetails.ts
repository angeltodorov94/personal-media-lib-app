import { api } from "@/lib/axios";
import { CollectionDetails } from "@/types/collection";
import { useQuery } from "@tanstack/react-query";

async function queryFn(id: string): Promise<CollectionDetails> {
  const { data } = await api.get<CollectionDetails>(`collection/${id}`, {
    params: { language: "en-US" },
  });

  return data;
}

export function useGetCollectionDetails(id: string, enabled: boolean) {
  return useQuery({
    queryKey: ["collection-details", id],
    queryFn: () => queryFn(id),
    enabled,
  });
}
