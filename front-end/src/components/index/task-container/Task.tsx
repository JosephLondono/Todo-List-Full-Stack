import React, { useEffect } from "react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { TaskItemType } from "@/types/TaskItemType";
import TaskItem from "./TaskItem";
import { getTask } from "@/lib/taskManager/getTask";
import "@/components/index/task-container/ScrollStyles.css";

export function Task({
  incompleteList,
  inProgressList,
  completeList,
}: {
  incompleteList: TaskItemType[];
  inProgressList: TaskItemType[];
  completeList: TaskItemType[];
}) {
  const [incompleteParent, incompleteItems, __setValuesIncomplete] =
    useDragAndDrop<HTMLUListElement, TaskItemType>(incompleteList, {
      group: "todoList",
    });
  const [inProgressParent, inProgressItems, __setValuesInProgress] =
    useDragAndDrop<HTMLUListElement, TaskItemType>(inProgressList, {
      group: "todoList",
    });
  const [completeParent, completeItems, __setValuesComplete] = useDragAndDrop<
    HTMLUListElement,
    TaskItemType
  >(completeList, {
    group: "todoList",
  });

  useEffect(() => {
    incompleteItems.forEach((item) => {
      item.status = "incomplete";
    });
  }, [incompleteItems]);

  useEffect(() => {
    inProgressItems.forEach((item) => {
      item.status = "inProgress";
    });
  }, [inProgressItems]);

  useEffect(() => {
    completeItems.forEach((item) => {
      item.status = "complete";
    });
  }, [completeItems]);

  const refreshData = async () => {
    const { incomplete, inProgress, complete } = await getTask();
    __setValuesIncomplete(incomplete);
    __setValuesInProgress(inProgress);
    __setValuesComplete(complete);
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Lista de tareas</h1>
        <div className="flex gap-2 items-center justify-center mr-4">
          <button type="button" title="Agregar tarea">
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
          <button type="button" title="Refrescar tareas">
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
      </div>
      <div className="grid grid-cols-3 min-h-[70vh] gap-x-11 content-stretch">
        <div className="task-container">
          <h2 className="text-white font-medium text-lg">Tareas Incompletas</h2>
          <ul
            ref={incompleteParent}
            className="flex flex-col gap-y-2 bg-sofka-light h-full mb-2 rounded-lg max-h-[367px]"
          >
            {incompleteItems.map((incompleteItem) => (
              <TaskItem
                {...incompleteItem}
                key={incompleteItem.id}
                refreshData={refreshData}
              />
            ))}
          </ul>
        </div>

        <div className="task-container">
          <h2 className="text-white font-medium text-lg">Tareas en proceso</h2>
          <ul
            ref={inProgressParent}
            className="flex flex-col gap-y-2 bg-sofka-light h-full mb-2 rounded-lg max-h-[367px]"
          >
            {inProgressItems.map((inProgressItem) => (
              <TaskItem
                {...inProgressItem}
                key={inProgressItem.id}
                refreshData={refreshData}
              />
            ))}
          </ul>
        </div>

        <div className="task-container">
          <h2 className="text-white font-medium text-lg">Tareas completadas</h2>
          <ul
            ref={completeParent}
            className="flex flex-col gap-y-2 bg-sofka-light h-full mb-2 rounded-lg max-h-[367px]"
          >
            {completeItems.map((completeItem) => (
              <TaskItem
                {...completeItem}
                key={completeItem.id}
                refreshData={refreshData}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
