import { useToast } from "@/components/ui/toast";
import { api } from "@/lib/axios";
import { getErrorMessage } from "@/lib/getErrorMessage";
import {
  invalidateMyRatingsLater,
  setCachedRating,
} from "@/lib/setCachedRating";
import { MutationResponse } from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function mutationFn(
  type: "movie" | "tv",
  id: number,
): Promise<MutationResponse> {
  const { data } = await api.delete<MutationResponse>(`${type}/${id}/rating`);

  return data;
}

export function useDeleteRating(type: "movie" | "tv", id: number) {
  const qC = useQueryClient();
  const { success, error } = useToast();

  return useMutation({
    mutationFn: () => mutationFn(type, id),
    onSuccess: async (res) => {
      // Awaited so the modal only closes once the cache reflects the removal
      await setCachedRating(qC, type, id, false);
      invalidateMyRatingsLater(qC, type);
      success("Success!", res.status_message);
    },
    onError: (err) => {
      error("Error!", getErrorMessage(err));
    },
  });
}
