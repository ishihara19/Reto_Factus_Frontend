import axios from "axios";

export default function parseAxiosError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Ocurrió un error desconocido";
}