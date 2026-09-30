import { api } from "@/lib/axios";
import { Country } from "@/types/common";
import { useQuery } from "@tanstack/react-query";

async function queryFn(): Promise<Country[]> {
  const { data } = await api.get<Country[]>("configuration/countries", {
    params: { language: "en-US" },
  });

  return [...data].sort((a, b) => a.english_name.localeCompare(b.english_name));
}

export function useGetCountries() {
  return useQuery({
    queryKey: ["countries"],
    queryFn,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
