import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginService, userMe } from "@/services/authService";
import { setToken, setRefreshToken } from "@/utils/token";
import { useNavigate } from "react-router-dom";
import parseAxiosError from "@/types/errors";
import ErrorModal from "@/components/ui/ErrorModal"; // <- Nuevo import
import { useAuth } from "@/contexts/AuthContext";

const schema = z.object({
  username: z.email({ message: "Formato de Email inválido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { login,clearSessionExpired } = useAuth();
  console.log( errorMsg)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await loginService(data);
      setToken(response.access_token);
      setRefreshToken(response.refresh_token);
      
      const res = await userMe();
      login(res.data);
      
      navigate("/");
    } catch (error) {
      const errorMessage = parseAxiosError(error);
      setErrorMsg(errorMessage);
      clearSessionExpired()
    }
  };

  return (
    <>
      {errorMsg && <ErrorModal message={errorMsg} onClose={() => setErrorMsg(null)} />}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm mx-auto mt-10">
        <div>
          <label className="block font-medium">Email</label>
          <input
            {...register("username")}
            className="border p-2 w-full rounded"
            placeholder="correo@ejemplo.com"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Contraseña</label>
          <input
            type="password"
            {...register("password")}
            className="border p-2 w-full rounded"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
        >
          {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
        </button>
      </form>
    </>
  );
}
