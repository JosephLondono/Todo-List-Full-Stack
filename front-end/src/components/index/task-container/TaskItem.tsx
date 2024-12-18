import Image from "next/image";
import React from "react";
import { type TaskItemType } from "@/types/TaskItemType";

const TaskItem = ({ title, description }: TaskItemType) => {
  return (
    <div className="task-item grid grid-cols-task-Item gap-x-4">
      <div>
        <h3 className="font-medium text-lg">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
      <div className="flex justify-end items-center">
        <button>
          <Image src="/points.png" width={20} height={20} alt="points"></Image>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
