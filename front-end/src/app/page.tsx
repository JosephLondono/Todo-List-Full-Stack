"use client";
import { TaskItemType } from "@/types/TaskItemType";
import { Task } from "./components/index/task-container/Task";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col gap-3 bg-sofka-light justify-center">
      <div className="max-w-7xl flex flex-col w-full mx-auto gap-y-4">
        <h1 className="text-2xl font-semibold mt-2">Lista de tareas</h1>
        <Task
          incompleteList={incompleteList}
          inProgressList={inProgressList}
          completeList={completeList}
        />
      </div>
    </main>
  );
}

const incompleteList: TaskItemType[] = [
  {
    id: "1",
    title: "Tarea 1",
    description: "Beth has a new mix-tape she wants you to listen to.",
  },
  {
    id: "2",
    title: "Tarea 2",
    description: "Beth has a new mix-tape she wants you to listen to.",
  },
];
const inProgressList: TaskItemType[] = [
  {
    id: "3",
    title: "Tarea 3",
    description: "Beth has a new mix-tape she wants you to listen to.",
  },
];
const completeList: TaskItemType[] = [
  {
    id: "4",
    title: "Tarea 4",
    description: "Beth has a new mix-tape she wants you to listen to.",
  },
];
