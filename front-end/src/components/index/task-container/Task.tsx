import React from "react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { TaskItemType } from "@/types/TaskItemType";
import TaskItem from "./TaskItem";

export function Task({
  incompleteList,
  inProgressList,
  completeList,
}: {
  incompleteList: TaskItemType[];
  inProgressList: TaskItemType[];
  completeList: TaskItemType[];
}) {
  const [incompleteParent, incompleteItems] = useDragAndDrop<
    HTMLUListElement,
    TaskItemType
  >(incompleteList, {
    group: "todoList",
  });
  const [inProgressParent, inProgressItems] = useDragAndDrop<
    HTMLUListElement,
    TaskItemType
  >(inProgressList, {
    group: "todoList",
  });
  const [completeParent, completeItems] = useDragAndDrop<
    HTMLUListElement,
    TaskItemType
  >(completeList, {
    group: "todoList",
  });

  return (
    <div className="grid grid-cols-3 min-h-[70vh] gap-x-11 content-stretch">
      <div className="task-container">
        <h2 className="text-white font-medium text-lg">Tareas Incompletas</h2>
        <ul
          ref={incompleteParent}
          className="flex flex-col gap-y-2 bg-sofka-light h-full mb-2 rounded-lg"
        >
          {incompleteItems.map((incompleteItem) => (
            <TaskItem {...incompleteItem} key={incompleteItem.id} />
          ))}
        </ul>
      </div>

      <div className="task-container">
        <h2 className="text-white font-medium text-lg">Tareas en proceso</h2>
        <ul
          ref={inProgressParent}
          className="flex flex-col gap-y-2 bg-sofka-light h-full mb-2 rounded-lg"
        >
          {inProgressItems.map((inProgressItem) => (
            <TaskItem {...inProgressItem} key={inProgressItem.id} />
          ))}
        </ul>
      </div>

      <div className="task-container">
        <h2 className="text-white font-medium text-lg">Tareas completadas</h2>
        <ul
          ref={completeParent}
          className="flex flex-col gap-y-2 bg-sofka-light h-full mb-2 rounded-lg"
        >
          {completeItems.map((completeItem) => (
            <TaskItem {...completeItem} key={completeItem.id} />
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={() => {
          console.log("Obtener Tareas");
          console.table(incompleteItems);
          console.table(inProgressItems);
          console.table(completeItems);
          console.log("Fin de las tareas");
        }}
      >
        Obtener Tareas
      </button>
    </div>
  );
}
