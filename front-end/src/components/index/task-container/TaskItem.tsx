import Image from "next/image";
import React, { useState } from "react";
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
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState<
    "incomplete" | "inProgress" | "complete"
  >(task.status || "incomplete");
  const [dateEnd, setDateEnd] = useState(task.dateEnd || "");
  const [errors, setErrors] = useState<string[]>([]);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const updatedTask: Partial<TaskItemType> = {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        dateEnd: task.dateEnd,
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

  return (
    <>
      <div className="task-item grid grid-cols-task-Item gap-x-4 bg-white shadow-sm rounded-lg p-4 mb-2 cursor-grab">
        <div>
          <div className="flex justify-between items-center gap-2">
            <h3 className="font-medium text-lg text-gray-900">{title}</h3>
            <span className="text-xs text-gray-600">{dateEnd}</span>
          </div>
          <p className="text-sm text-gray-700">{description}</p>
        </div>
        <div className="flex justify-end items-center">
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
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
            value={status}
            onChange={(e) =>
              setStatus(
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
            className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
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
