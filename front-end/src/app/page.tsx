"use client";
import { Task } from "@/components/index/task-container/Task";
import { getTask } from "@/lib/taskManager/getTask";

export default function Home() {
  const { complete = [], inProgress = [], incomplete = [] } = getTask();

  return (
    <main className="flex-1 flex flex-col gap-3 bg-sofka-light justify-center">
      <div className="max-w-7xl flex flex-col w-full mx-auto gap-y-4">
        <h1 className="text-2xl font-semibold mt-2">Lista de tareas</h1>
        <Task
          incompleteList={incomplete}
          inProgressList={inProgress}
          completeList={complete}
        />
      </div>
    </main>
  );
}
