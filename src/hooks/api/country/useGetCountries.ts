import { api } from "@/lib/axios";
import { Country } from "@/types/common.type";
import { useQuery } from "@tanstack/react-query";

const select = (data: Country[]): Country[] =>
  data.sort((a, b) => a.english_name.localeCompare(b.english_name));

async function queryFn(): Promise<Country[]> {
  const { data } = await api.get(`configuration/countries?language=en-US`);

  return data;
}

export function useGetCountries() {
  return useQuery({
    queryKey: ["countries"],
    queryFn,
    select,
    staleTime: Infinity,
  });
}
