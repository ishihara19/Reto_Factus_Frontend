import { api } from "./api";
import type { AuthPayload,AuthResponse } from "../types/auth";




export async function login(payload: AuthPayload): Promise<AuthResponse>{
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
