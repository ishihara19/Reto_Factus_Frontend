// src/components/ui/ErrorModal.tsx
import { Dialog } from '@headlessui/react';

interface Props {
  message: string;
  onClose: () => void;
}

export default function ErrorModal({ message, onClose }: Props) {
  return (
    <Dialog
      open={!!message}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Backdrop manual */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal content */}
      <div className="relative z-50 bg-white rounded-lg shadow-xl p-6 max-w-sm mx-auto w-full">
        {/* Título accesible */}
        <h2 className="text-lg font-semibold text-red-600" id="error-title">
          Error
        </h2>

        {/* Descripción accesible */}
        <p className="mt-2 text-gray-700" id="error-desc">
          {message}
        </p>

        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Dialog>
  );
}
