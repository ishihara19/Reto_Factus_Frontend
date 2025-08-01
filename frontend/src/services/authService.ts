import { api } from "./api";
import type { AuthPayload,AuthResponse } from "../types/auth";
import type { ResponseUserMe } from "../types/user";


export async function loginService(payload: AuthPayload): Promise<AuthResponse>{
    const form = new URLSearchParams();
    form.append("username", payload.username);
    form.append("password", payload.password);
    const response = await api.post("/auth/login", form, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
    return response.data
}

export async function userMe(): Promise<ResponseUserMe> {
  const response = await api.get<ResponseUserMe>("/auth/me");
  //console.log("Respuesta del usuario:", response);
  return response.data;
}