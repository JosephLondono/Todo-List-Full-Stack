import Image from "next/image";
import React, { useState, useEffect } from "react";
import { type TaskItemType } from "@/types/TaskItemType";
import { deleteTask } from "@/lib/taskManager/deleteTask";
import { updateTask } from "@/lib/taskManager/updateTask";
import Modal from "@/components/Modal";
import { Slide, toast } from "react-toastify";
import { useSessionContext } from "@/context/sessionContext";

interface TaskItemProps {
  task: TaskItemType;
  refreshData: () => void;
}

const STYLE_TASK_ITEM = {
  default: {
    backgroundColor: "bg-white dark:bg-white",
    colorTextDate: {
      color: "text-gray-900",
      colorRed: "text-red-700 dark:text-red-700",
    },
  },
  red: {
    backgroundColor: "bg-red-200 dark:bg-red-200",
    colorTextDate: {
      color: "text-gray-900",
      colorRed: "text-red-700 dark:text-red-700",
    },
  },
  green: {
    backgroundColor: "bg-green-200 dark:bg-green-200",
    colorTextDate: {
      color: "text-gray-900",
      colorRed: "text-red-700 dark:text-red-700",
    },
  },
  blue: {
    backgroundColor: "bg-blue-200 dark:bg-blue-200",
    colorTextDate: {
      color: "text-gray-900",
      colorRed: "text-red-700 dark:text-red-700",
    },
  },
  yellow: {
    backgroundColor: "bg-yellow-200 dark:bg-yellow-200",
    colorTextDate: {
      color: "text-gray-900",
      colorRed: "text-red-700 dark:text-red-700",
    },
  },
  orange: {
    backgroundColor: "bg-orange-200 dark:bg-orange-200",
    colorTextDate: {
      color: "text-gray-900",
      colorRed: "text-red-700 dark:text-red-700",
    },
  },
  purple: {
    backgroundColor: "bg-purple-400/80 dark:bg-purple-300",
    colorTextDate: {
      color: "text-gray-900",
      colorRed: "text-red-700 dark:text-red-700",
    },
  },
  pink: {
    backgroundColor: "bg-pink-200 dark:bg-pink-200",
    colorTextDate: {
      color: "text-gray-900",
      colorRed: "text-red-700 dark:text-red-700",
    },
  },
};

const TaskItem: React.FC<TaskItemProps> = ({ task, refreshData }) => {
  const style = task.style || "default";
  const sessionContext = useSessionContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalStatus, setModalStatus] = useState<
    "incomplete" | "inProgress" | "complete"
  >("incomplete");
  const [modalDateEnd, setModalDateEnd] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmittingUpdate, setIsSubmittingUpdate] = useState(false);
  const [isSubmittinDelete, setIsSubmittinDelete] = useState(false);

  useEffect(() => {
    if (task) {
      setModalTitle(task.title || "");
      setModalDescription(task.description || "");
      setModalStatus(task.status || "incomplete");
      setModalDateEnd(task.dateEnd ? task.dateEnd.split("T")[0] : "");
    }
  }, [task]);

  const handleClick = () => setIsModalOpen(true);

  const handleUpdate = async () => {
    setIsSubmittingUpdate(true);
    try {
      const updatedTask: Partial<TaskItemType> = {
        id: task.id,
        title: modalTitle,
        description: modalDescription,
        status: modalStatus,
        dateEnd: modalDateEnd,
      };

      if (!sessionContext.session?.accessToken) {
        setErrors([
          "No se puede actualizar la tarea. Token de acceso no disponible.",
        ]);
        return;
      }

      const responseUpdate = await updateTask(
        updatedTask,
        sessionContext.session.accessToken
      );

      if (responseUpdate.error) {
        setErrors(
          Array.isArray(responseUpdate.message)
            ? responseUpdate.message
            : [responseUpdate.message]
        );
      } else {
        setIsModalOpen(false);
        toast.success("Tarea actualizada correctamente.", {
          position: "bottom-right",
          transition: Slide,
        });
        refreshData();
      }
    } catch (error) {
      console.error(error);

      setErrors([
        "No se puede actualizar la tarea. Por favor, inténtelo de nuevo.",
      ]);
      toast.error(
        "No se puede actualizar la tarea. Por favor, inténtelo de nuevo.",
        {
          position: "bottom-right",
          transition: Slide,
        }
      );
    } finally {
      setIsSubmittingUpdate(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmittinDelete(true);
    try {
      if (!sessionContext.session?.accessToken) {
        setErrors([
          "No se puede eliminar la tarea. Token de acceso no disponible.",
        ]);
        return;
      }

      const responseDelete = await deleteTask(
        task.id,
        sessionContext.session.accessToken
      );

      if (responseDelete.error) {
        console.error(responseDelete.message);
      } else {
        setIsModalOpen(false);
        toast.success("Tarea eliminada correctamente.", {
          position: "bottom-right",
          transition: Slide,
        });
        refreshData();
      }
    } catch (error) {
      console.error(error);

      setErrors([
        "No se puede eliminar la tarea. Por favor, inténtelo de nuevo.",
      ]);
      toast.error(
        "No se puede eliminar la tarea. Por favor, inténtelo de nuevo.",
        {
          position: "bottom-right",
          transition: Slide,
        }
      );
    } finally {
      setIsSubmittinDelete(false);
    }
  };

  const dateNow = new Date().toISOString().split("T")[0];
  const isValidDate = dateNow <= task.dateEnd;

  return (
    <>
      <div
        className={`task-item grid lg:grid-cols-task-Item gap-x-4 shadow-sm rounded-lg xl:p-4 lg:p-2 p-2 relative ${STYLE_TASK_ITEM[style].backgroundColor}`}
      >
        <div className="min-w-0">
          <div className="xl:flex xl:justify-between items-center gap-2 md:gap-4 mb-2 mr-8 md:mr-3">
            <h3 className="font-medium text-lg text-gray-900 break-words overflow-hidden">
              {task.title}
            </h3>
            <span
              className={`text-xs whitespace-nowrap font-bold ${
                isValidDate
                  ? STYLE_TASK_ITEM[style].colorTextDate.color
                  : STYLE_TASK_ITEM[style].colorTextDate.colorRed
              }`}
            >
              {task.dateEnd ? task.dateEnd.split("T")[0] : ""}
            </span>
          </div>
          <p className="text-sm text-gray-700 break-words overflow-hidden">
            {task.description}
          </p>
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
        <div className="flex justify-end items-center absolute right-1 top-1/2 transform -translate-y-1/2">
          <button
            onClick={handleClick}
            className="hover:bg-gray-100 px-1 py-2 rounded-full"
          >
            <Image src="/points.png" width={20} height={20} alt="options" />
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Editar tarea
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

        <div className="mb-2">
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

        <div className="mb-2">
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

        <div className="mb-2">
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

        <div className="mb-2">
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

        <hr className="my-6 border-gray-200 dark:border-gray-600" />

        <div className="flex justify-between space-x-4">
          <button
            onClick={handleUpdate}
            className="bg-orange-500 dark:bg-orange-600 text-white py-2 px-1 rounded-lg font-semibold hover:bg-orange-400 dark:hover:bg-orange-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex-1"
            disabled={isSubmittingUpdate}
          >
            {isSubmittingUpdate ? "Actualizando..." : "Actualizar"}
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 dark:bg-red-600 text-white py-2 px-1 rounded-lg font-semibold hover:bg-red-400 dark:hover:bg-red-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex-1"
            disabled={isSubmittinDelete}
          >
            {isSubmittinDelete ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default TaskItem;
