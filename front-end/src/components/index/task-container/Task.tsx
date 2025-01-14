import React, { useEffect, useState } from "react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { TaskItemType } from "@/types/TaskItemType";
import TaskItem from "./TaskItem";
import { getTask } from "@/lib/taskManager/getTask";
import "@/components/index/task-container/ScrollStyles.css";
import HeaderTask from "../HeaderTask";
import { saveTask } from "@/lib/taskManager/saveTask";

import { toast, Slide } from "react-toastify";
import { useSessionContext } from "@/context/sessionContext";

export function Task({
  incompleteList,
  inProgressList,
  completeList,
}: {
  incompleteList: TaskItemType[];
  inProgressList: TaskItemType[];
  completeList: TaskItemType[];
}) {
  const sessionContext = useSessionContext();
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

  const refreshData = async () => {
    if (!sessionContext.session?.accessToken) {
      throw new Error("Access token is undefined");
    }
    const { incomplete, inProgress, complete } = await getTask(
      sessionContext.session
    );
    __setValuesIncomplete(incomplete);
    __setValuesInProgress(inProgress);
    __setValuesComplete(complete);
  };

  const handleFreshData = async () => {
    setIsRefresh(true);
    await refreshData();
    toast.info("Tareas actualizadas", {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: false,
      pauseOnHover: true,
      theme: "light",
      transition: Slide,
    });
    setIsRefresh(false);
  };

  const saveData = async () => {
    if (!sessionContext.session?.accessToken) {
      throw new Error("EL token es requerido");
    }
    const response = await saveTask(
      [...incompleteItems, ...inProgressItems, ...completeItems],
      sessionContext.session?.accessToken
    );

    if (response.length > 0) {
      response.forEach((error) => {
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Slide,
        });
      });
      return;
    }

    toast.success("Tareas guardadas exitosamente", {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: false,
      pauseOnHover: true,
      theme: "light",
      transition: Slide,
    });
  };

  const handleSave = async () => {
    setIsSave(true);
    await saveData();
    setIsSave(false);
  };

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

  return (
    <section className="mb-4 mt-4">
      <HeaderTask
        handleFreshData={handleFreshData}
        isRefresh={isRefresh}
        isSave={isSave}
        handleSave={handleSave}
        refreshData={refreshData}
      />
      <div className="grid lg:grid-cols-3 min-h-[70vh] lg:gap-x-11 lg:content-stretch gap-y-4 lg:gap-y-0 max-w-[80%] mx-auto lg:max-w-[auto]">
        <div className="task-container">
          <h2 className="text-white font-medium text-lg">Tareas Incompletas</h2>
          <ul
            ref={incompleteParent}
            className="flex flex-col gap-y-2 bg-sofka-light h-full rounded-lg max-h-[367px]  min-h-[112px] pr-4 md:pr-0 sm:pr-2"
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
            className="flex flex-col gap-y-2 bg-sofka-light h-full rounded-lg max-h-[367px] min-h-[112px] pr-4 md:pr-0 sm:pr-2"
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
            className="flex flex-col gap-y-2 bg-sofka-light h-full rounded-lg max-h-[367px] min-h-[112px] pr-4 md:pr-0 sm:pr-2"
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
