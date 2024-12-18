import Image from "next/image";
import React, { useState } from "react";
import { type TaskItemType } from "@/types/TaskItemType";
import { createPortal } from "react-dom";

interface TaskItemProps {
  title: TaskItemType["title"];
  description: TaskItemType["description"];
  id: TaskItemType["id"];
  list: TaskItemType[];
  dateEnd: TaskItemType["dateEnd"];
}

const TaskItem: React.FC<TaskItemProps> = ({
  title,
  description,
  id,
  list,
  dateEnd,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="task-item grid grid-cols-task-Item gap-x-4 bg-white shadow-sm rounded-lg p-4 mb-2">
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
      <Modal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        title={title}
        description={description}
        id={id}
      />
    </>
  );
};

interface ModalProps extends Partial<TaskItemType> {
  isOpen: boolean;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  title: initialTitle,
  description: initialDescription,
  id,
}) => {
  const [title, setTitle] = useState(initialTitle || "");
  const [description, setDescription] = useState(initialDescription || "");

  const handleUpdate = () => {
    console.log("HOLAAA");
    closeModal();
  };

  const handleDelete = () => {
    console.log("CHAOOO");
    console.log(id);
    closeModal();
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-6 w-96 max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Task</h2>

        <div className="mb-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title
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
            Description
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
            Date
          </label>
          <input
            id="date"
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <hr className="bg-black my-6" />
        <div className="flex justify-between space-x-4">
          <button
            onClick={handleUpdate}
            className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>

        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>,
    document.body
  );
};

export default TaskItem;
