import { useToast } from "@/components/ui/toast";
import { api } from "@/lib/axios";
import { MutationResponse } from "@/types/common.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function mutationFn(
  type: "movie" | "tv",
  id: number,
  rating: number,
): Promise<MutationResponse> {
  const { data } = await api.post(`${type}/${id}/rating`, {
    value: rating,
  });

  return data;
}

export function useAddRating(type: "movie" | "tv", id: number, rating: number) {
  const qC = useQueryClient();
  const { success, error } = useToast();

  return useMutation({
    mutationFn: () => mutationFn(type, id, rating),
    onSuccess: (res) => {
      qC.invalidateQueries({
        queryKey: ["my-ratings"],
      });
      qC.invalidateQueries({
        queryKey: [type === "tv" ? "tv-show-details" : "movie-details", id],
      });

      success("Success!", res.status_message);
    },
    onError: () => {
      error("Error!", "Something went wrong!");
    },
  });
}
