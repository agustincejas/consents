import { useMutation } from "@tanstack/react-query";
import { Consent } from "../interfaces/consents";
import { postConsent } from "../services/consents";
import { queryClient } from "../main";
import { fetchConsentsKey } from "./use-fetch-consents";

export const usePostConsent = () =>
  useMutation({
    mutationFn: async (consent: Consent) => await postConsent(consent),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: fetchConsentsKey });
    },
  });
