import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning";
  onClose: () => void;
}

const colors = {
  success: "bg-emerald-500",
  error: "bg-red-500",
  warning: "bg-amber-500",
};

export default function Toast({ message, type = "success", onClose }: ToastProps) {
  useEffect(() => {
    const timeout = setTimeout(onClose, 3000); // Desaparece a los 3 segundos
    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className={`fixed top-5 right-5 z-50 text-white px-4 py-2 rounded shadow ${colors[type]}`}>
      {message}
    </div>
  );
}
