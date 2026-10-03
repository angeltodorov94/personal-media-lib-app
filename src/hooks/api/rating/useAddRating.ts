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
  rating: number,
): Promise<MutationResponse> {
  const { data } = await api.post<MutationResponse>(`${type}/${id}/rating`, {
    value: rating,
  });

  return data;
}

export function useAddRating(type: "movie" | "tv", id: number) {
  const qC = useQueryClient();
  const { success, error } = useToast();

  return useMutation({
    mutationFn: (rating: number) => mutationFn(type, id, rating),
    onSuccess: async (res, rating) => {
      // Awaited so the modal only closes once the new rating is in the cache
      await setCachedRating(qC, type, id, { value: rating });
      invalidateMyRatingsLater(qC, type);
      success("Success!", res.status_message);
    },
    onError: (err) => {
      error("Error!", getErrorMessage(err));
    },
  });
}
