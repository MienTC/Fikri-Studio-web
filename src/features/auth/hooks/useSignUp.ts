import { useMutation } from "@tanstack/react-query";
import { authService } from "../../../services/authServices";
import type { SignUpDto, SignUpData } from "../../../types/authTypes";

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (data: SignUpDto): Promise<SignUpData> => {
      const result = await authService.signUp(data);
      if (!result) {
        throw new Error("Sign up failed");
      }
      return result;
    },
  });
};
