import React, { useEffect, useState } from "react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { TaskItemType } from "@/types/TaskItemType";
import TaskItem from "./TaskItem";
import { getTask } from "@/lib/taskManager/getTask";
import "@/components/index/task-container/ScrollStyles.css";
import HeaderTask from "../HeaderTask";
import { saveTask } from "@/lib/taskManager/saveTask";

export function Task({
  incompleteList,
  inProgressList,
  completeList,
}: {
  incompleteList: TaskItemType[];
  inProgressList: TaskItemType[];
  completeList: TaskItemType[];
}) {
  const [isRefresh, setIsRefresh] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [incompleteParent, incompleteItems, __setValuesIncomplete] =
    useDragAndDrop<HTMLUListElement, TaskItemType>(incompleteList, {
      group: "todoList",
      dragHandle: ".handle-task-item",
    });
  const [inProgressParent, inProgressItems, __setValuesInProgress] =
    useDragAndDrop<HTMLUListElement, TaskItemType>(inProgressList, {
      group: "todoList",
      dragHandle: ".handle-task-item",
    });
  const [completeParent, completeItems, __setValuesComplete] = useDragAndDrop<
    HTMLUListElement,
    TaskItemType
  >(completeList, {
    group: "todoList",
    dragHandle: ".handle-task-item",
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

  const handleFreshData = async () => {
    setIsRefresh(true);
    await refreshData();
    setIsRefresh(false);
  };

  const saveData = async () => {
    const xd = await saveTask([
      ...incompleteItems,
      ...inProgressItems,
      ...completeItems,
    ]);

    // Pendiente Notificaciones
    console.log("RESULTADOO: ", xd);
  };

  const handleSave = async () => {
    setIsSave(true);
    await saveData();
    setIsSave(false);
  };

  return (
    <section className="mb-4 mt-4">
      <HeaderTask
        handleFreshData={handleFreshData}
        isRefresh={isRefresh}
        isSave={isSave}
        handleSave={handleSave}
      />
      <div className="grid lg:grid-cols-3 min-h-[70vh] lg:gap-x-11 lg:content-stretch gap-y-4 lg:gap-y-0 max-w-[80%] mx-auto lg:max-w-[auto]">
        <div className="task-container">
          <h2 className="text-white font-medium text-lg">Tareas Incompletas</h2>
          <ul
            ref={incompleteParent}
            className="flex flex-col gap-y-2 bg-sofka-light h-full rounded-lg max-h-[367px]  min-h-[112px]"
          >
            {incompleteItems.map((incompleteItem) => (
              <TaskItem
                task={incompleteItem}
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
            className="flex flex-col gap-y-2 bg-sofka-light h-full rounded-lg max-h-[367px] min-h-[112px]"
          >
            {inProgressItems.map((inProgressItem) => (
              <TaskItem
                task={inProgressItem}
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
            className="flex flex-col gap-y-2 bg-sofka-light h-full rounded-lg max-h-[367px] min-h-[112px]"
          >
            {completeItems.map((completeItem) => (
              <TaskItem
                task={completeItem}
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
