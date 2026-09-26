import { useToast } from "@/components/ui/toast";
import { api } from "@/lib/axios";
import { MutationResponse } from "@/types/common.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function mutationFn(
  type: "movie" | "tv",
  id: number,
): Promise<MutationResponse> {
  const { data } = await api.delete(`${type}/${id}/rating`);

  return data;
}

export function useDeleteRating(type: "movie" | "tv", id: number) {
  const qC = useQueryClient();
  const { success, error } = useToast();

  return useMutation({
    mutationFn: () => mutationFn(type, id),
    onSuccess: (res) => {
      qC.invalidateQueries({
        queryKey: ["my-ratings"],
      });

      success("Success!", res.status_message);
    },
    onError: () => {
      error("Error!", "Something went wrong!");
    },
  });
}
