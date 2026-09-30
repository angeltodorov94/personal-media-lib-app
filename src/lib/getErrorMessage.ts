import { MutationResponse } from "@/types/common";
import { isAxiosError } from "axios";

/** Prefers TMDB's own `status_message`, then the axios/JS error message. */
export function getErrorMessage(
  err: unknown,
  fallback = "Something went wrong!",
): string {
  if (isAxiosError<Partial<MutationResponse>>(err)) {
    return err.response?.data?.status_message ?? err.message ?? fallback;
  }

  if (err instanceof Error) return err.message || fallback;

  return fallback;
}
