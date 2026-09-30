import { api } from "@/lib/axios";
import { PersonDetails } from "@/types/person";
import { useQuery } from "@tanstack/react-query";

async function queryFn(id: string): Promise<PersonDetails> {
  const { data } = await api.get<PersonDetails>(`person/${id}`, {
    params: {
      append_to_response: "combined_credits",
      language: "en-US",
    },
  });

  return data;
}

export function useGetPersonFullDetails(id: string) {
  return useQuery({
    queryKey: ["person-details", id],
    queryFn: () => queryFn(id),
  });
}
