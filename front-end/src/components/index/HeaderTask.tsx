import React, { useState } from "react";
import Modal from "../Modal";
import { createTask } from "@/lib/taskManager/createTask";

const HeaderTask = ({ refreshTask }: { refreshTask: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalStatus, setModalStatus] = useState<
    "incomplete" | "inProgress" | "complete"
  >("incomplete");
  const [modalDateEnd, setModalDateEnd] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [errors, setErrors] = useState<string[]>([]);
  const [isSummit, setIsSummit] = useState(false);

  const handleCreate = async () => {
    setIsSummit(true);
    try {
      const newTask = {
        title: modalTitle,
        description: modalDescription,
        status: modalStatus,
        dateEnd: modalDateEnd,
      };
      const responseCreate = await createTask(newTask);
      if (responseCreate.error) {
        if (Array.isArray(responseCreate.message)) {
          setErrors(responseCreate.message);
        } else {
          setErrors([responseCreate.message]);
        }
      } else {
        handleCloseModal(false);
        refreshTask();
      }
    } catch (error) {
      setErrors(["No se puede crear la tarea. Por favor, inténtelo de nuevo."]);
      console.error("Error al crear la tarea:", error);
    } finally {
      setIsSummit(false);
    }
  };

  const addTask = () => {
    setIsModalOpen(true);
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
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-semibold">Lista de tareas</h1>
      <div className="flex gap-2 items-center justify-center mr-4">
        <button type="button" title="Agregar tarea" onClick={addTask}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
            <path d="M9 12h6" />
            <path d="M12 9v6" />
          </svg>
        </button>
        <button type="button" title="Refrescar tareas" onClick={refreshTask}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
          </svg>
        </button>
      </div>
      <Modal isOpen={isModalOpen} closeModal={() => handleCloseModal(false)}>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Crear tarea</h2>

        {errors.length > 0 && (
          <div className="mb-4 bg-red-200 py-1 px-2 rounded-md">
            <ul className="text-red-700 text-sm">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Titulo
          </label>
          <input
            id="title"
            type="text"
            value={modalTitle}
            onChange={(e) => setModalTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Descripcion
          </label>
          <textarea
            id="description"
            value={modalDescription}
            onChange={(e) => setModalDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 max-h-32 min-h-fit"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Fecha
          </label>
          <input
            id="date"
            type="date"
            value={modalDateEnd}
            onChange={(e) => setModalDateEnd(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-2"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="incomplete">Incompleta</option>
            <option value="inProgress">En Proceso</option>
            <option value="complete">Completada</option>
          </select>
        </div>
        <hr className="bg-black my-6" />
        <div className="flex justify-between space-x-4">
          <button
            onClick={handleCreate}
            className="bg-sofka-orange text-white py-2 px-1 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex-1"
            disabled={isSummit}
          >
            {isSummit ? "Creando..." : "Crear"}
          </button>
          <button
            onClick={() => handleCloseModal(false)}
            className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-400 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default HeaderTask;
