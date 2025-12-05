import {
  AuthResponse,
  LoginInput,
  RegisterInput,
} from "../lib/schema/authSchema";
import apiClient from "./axios";

export const loginUserApi = async (data: LoginInput): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/auth/login", data);
  return response.data;
};

export const registerUserApi = async (
  data: RegisterInput
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/auth/register", data);
  return response.data;
};
