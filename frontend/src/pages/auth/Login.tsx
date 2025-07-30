import LoginForm from "@/components/forms/LoginForm";

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h1>
        <LoginForm />
      </div>
    </div>
  );
}