import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-xl shadow-2xl p-6 w-96 max-w-md relative max-h-[90%] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
