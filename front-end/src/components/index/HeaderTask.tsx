import React, { useState } from "react";
import Modal from "@/components/Modal";
import { createTask } from "@/lib/taskManager/createTask";
import { toast } from "react-toastify";
import { useSessionContext } from "@/context/sessionContext";

interface HeaderTaskProps {
  handleFreshData: () => void;
  handleSave: () => void;
  refreshData: () => void;
  isRefresh: boolean;
  isSave: boolean;
}

const HeaderTask: React.FC<HeaderTaskProps> = ({
  handleFreshData,
  handleSave,
  refreshData,
  isRefresh,
  isSave,
}) => {
  const sessionContext = useSessionContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalStatus, setModalStatus] = useState<
    "incomplete" | "inProgress" | "complete"
  >("incomplete");
  const [style, setStyle] = useState<
    "default" | "blue" | "yellow" | "orange" | "purple" | "pink"
  >("default");
  const [modalDateEnd, setModalDateEnd] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [errors, setErrors] = useState<string[]>([]);
  const [isSummit, setIsSummit] = useState(false);

  const handleCreate = async () => {
    setIsSummit(true);
    try {
      if (!sessionContext.session?.accessToken) {
        setErrors([
          "No se puede crear la tarea. Token de acceso no disponible.",
        ]);
        return;
      }

      const response = await createTask(
        {
          title: modalTitle,
          description: modalDescription,
          status: modalStatus,
          dateEnd: modalDateEnd,
          style: style,
        },
        sessionContext.session.accessToken
      );

      if (response.error) {
        setErrors(
          Array.isArray(response.message)
            ? response.message
            : [response.message]
        );
      } else {
        handleCloseModal(false);
        refreshData();
        toast.success("Tarea creada correctamente.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      setErrors(["No se puede crear la tarea. Por favor, inténtelo de nuevo."]);
      console.error("Error al crear la tarea:", error);
    } finally {
      setIsSummit(false);
    }
  };

  const handleCloseModal = (value: boolean) => {
    setIsModalOpen(value);
    setModalTitle("");
    setModalDescription("");
    setModalStatus("incomplete");
    setModalDateEnd(new Date().toISOString().split("T")[0]);
    setErrors([]);
  };

  return (
    <div className="flex justify-between items-center flex-col md:flex-row rounded-lg mb-4">
      <h1 className="text-2xl font-semibold px-7 text-gray-800 dark:text-gray-100">
        Lista de tareas
      </h1>
      <div className="flex gap-2 items-center justify-center mr-4 flex-wrap">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex gap-x-1 bg-orange-500 dark:bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-400 dark:hover:bg-orange-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-md hover:shadow-lg py-1 px-2"
        >
          Agregar
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M12 5v14m-7-7h14" />
          </svg>
        </button>

        <button
          type="button"
          onClick={handleFreshData}
          disabled={isRefresh}
          className="flex gap-x-1 bg-blue-500 dark:bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-400 dark:hover:bg-blue-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-md hover:shadow-lg disabled:opacity-50 py-1 px-2 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {isRefresh ? (
            "Refrescando..."
          ) : (
            <>
              Refrescar
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M20 11a8.1 8.1 0 0 0-15.5-2m-.5-4v4h4M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
              </svg>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSave}
          className="flex gap-x-1 bg-green-500 dark:bg-green-600 text-white rounded-lg font-semibold hover:bg-green-400 dark:hover:bg-green-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-md hover:shadow-lg disabled:opacity-50 py-1 px-2 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {isSave ? (
            "Guardando..."
          ) : (
            <>
              Guardar
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M5 12l5 5l10-10" />
              </svg>
            </>
          )}
        </button>
      </div>

      <Modal isOpen={isModalOpen} closeModal={() => handleCloseModal(false)}>
        <div className="bg-white dark:bg-gray-800 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Crear tarea
          </h2>

          {errors.length > 0 && (
            <div className="mb-4 bg-red-200 dark:bg-red-900/50 py-1 px-2 rounded-md">
              <ul className="text-red-700 dark:text-red-200 text-sm">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Titulo
              </label>
              <input
                id="title"
                type="text"
                value={modalTitle}
                onChange={(e) => setModalTitle(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Descripcion
              </label>
              <textarea
                id="description"
                value={modalDescription}
                onChange={(e) => setModalDescription(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 max-h-32 min-h-fit dark:text-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Fecha
              </label>
              <input
                id="date"
                type="date"
                value={modalDateEnd}
                onChange={(e) => setModalDateEnd(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Estado
              </label>
              <select
                id="status"
                value={modalStatus}
                onChange={(e) =>
                  setModalStatus(
                    e.target.value as "incomplete" | "inProgress" | "complete"
                  )
                }
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-100"
              >
                <option value="incomplete">Incompleta</option>
                <option value="inProgress">En Proceso</option>
                <option value="complete">Completada</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="style"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Estilo
              </label>
              <div className="flex gap-4 flex-wrap justify-center">
                {[
                  { value: "default", color: "bg-gray-200 dark:bg-gray-600" },
                  { value: "blue", color: "bg-blue-500" },
                  { value: "yellow", color: "bg-yellow-400" },
                  { value: "orange", color: "bg-orange-500" },
                  { value: "purple", color: "bg-purple-500" },
                  { value: "pink", color: "bg-pink-500" },
                ].map(({ value, color }) => (
                  <label
                    key={value}
                    className="relative flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="style"
                      value={value}
                      checked={style === value}
                      onChange={(e) =>
                        setStyle(
                          e.target.value as
                            | "default"
                            | "blue"
                            | "yellow"
                            | "orange"
                            | "purple"
                            | "pink"
                        )
                      }
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full ${color} ring-2 ring-offset-2 dark:ring-offset-gray-800 ${
                        style === value
                          ? "ring-gray-400 dark:ring-gray-300"
                          : "ring-transparent"
                      }`}
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-200 capitalize">
                      {value}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-200 dark:border-gray-600" />

          <div className="flex justify-between space-x-4">
            <button
              onClick={handleCreate}
              disabled={isSummit}
              className="flex-1 bg-orange-500 dark:bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-400 dark:hover:bg-orange-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isSummit ? "Creando..." : "Crear"}
            </button>
            <button
              onClick={() => handleCloseModal(false)}
              className="flex-1 bg-red-500 dark:bg-red-600 text-white py-2 rounded-lg hover:bg-red-400 dark:hover:bg-red-500 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HeaderTask;
