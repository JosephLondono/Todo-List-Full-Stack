import Image from "next/image";
import React, { useState, useEffect } from "react";
import { type TaskItemType } from "@/types/TaskItemType";
import { deleteTask } from "@/lib/taskManager/deleteTask";
import { updateTask } from "@/lib/taskManager/updateTask";
import Modal from "@/components/Modal";

interface TaskItemProps {
  task: TaskItemType;
  refreshData: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  refreshData: refreshData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalStatus, setModalStatus] = useState<
    "incomplete" | "inProgress" | "complete"
  >("incomplete");
  const [modalDateEnd, setModalDateEnd] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (task) {
      setModalTitle(task.title || "");
      setModalDescription(task.description || "");
      setModalStatus(task.status || "incomplete");
      setModalDateEnd(task.dateEnd ? task.dateEnd.split("T")[0] : "");
    }
  }, [task]);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const updatedTask: Partial<TaskItemType> = {
        id: task.id,
        title: modalTitle,
        description: modalDescription,
        status: modalStatus,
        dateEnd: modalDateEnd,
      };
      const responseUpdate = await updateTask(updatedTask);

      if (responseUpdate.error) {
        if (Array.isArray(responseUpdate.message)) {
          setErrors(responseUpdate.message);
        } else {
          setErrors([responseUpdate.message]);
        }
      } else {
        setIsModalOpen(false);
        refreshData();
      }
    } catch (error) {
      setErrors([
        "No se puede actualizar la tarea. Por favor, inténtelo de nuevo.",
      ]);
      console.error("Error al actualizar la tarea:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const responseDelete = await deleteTask(task.id);

      if (responseDelete.error) {
        console.error(responseDelete.message);
      } else {
        setIsModalOpen(false);
        refreshData();
      }
    } catch (error) {
      setErrors([
        "No se puede eliminar la tarea. Por favor, inténtelo de nuevo.",
      ]);
      console.error("Error al eliminar la tarea:", error);
    }
  };

  const dateNow = new Date().toISOString().split("T")[0];
  return (
    <>
      <div className="task-item grid lg:grid-cols-task-Item gap-x-4 bg-white shadow-sm rounded-lg xl:p-4 lg:p-2 p-2 relative">
        <div>
          <div className="lg:flex lg:justify-between items-center gap-2 md:gap-4 mb-2 mr-8 md:mr-3">
            <h3 className="font-medium text-lg text-gray-900">{task.title}</h3>
            <span
              className={`text-xs whitespace-nowrap font-semibold ${
                dateNow > task.dateEnd ? "text-red-500" : "text-gray-600"
              }`}
            >
              {task.dateEnd ? task.dateEnd.split("T")[0] : ""}
            </span>
          </div>
          <p className="text-sm text-gray-700">{task.description}</p>
          <div className="flex justify-center items-center cursor-grab">
            <span className="px-1 py-2 rounded-full h-8 w-8 flex justify-center items-center xl:absolute right-1 bottom-0 text-gray-700 handle-task-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 256">
                <path
                  fill="currentColor"
                  d="M144 48a48 48 0 1 0-96 0 48 48 0 1 0 96 0zm160 0a48 48 0 1 0-96 0 48 48 0 1 0 96 0zM416 96A48 48 0 1 0 416 0a48 48 0 1 0 0 96zM144 208a48 48 0 1 0-96 0 48 48 0 1 0 96 0zm160 0a48 48 0 1 0-96 0 48 48 0 1 0 96 0zM416 256a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="flex justify-end items-center absolute right-1 top-1/2  transform -translate-y-1/2">
          <button
            onClick={handleClick}
            className="hover:bg-gray-100 px-1 py-2 rounded-full"
          >
            <Image src="/points.png" width={20} height={20} alt="options" />
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Editar tarea</h2>

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
            onClick={handleUpdate}
            className="flex-1 bg-sofka-orange text-white py-2 rounded-md hover:bg-sofka-orange/80 transition-colors"
          >
            Actualizar
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </Modal>
    </>
  );
};

export default TaskItem;
