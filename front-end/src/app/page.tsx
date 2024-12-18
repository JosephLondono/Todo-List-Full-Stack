"use client";
import { Task } from "@/components/index/task-container/Task";
import { getTask } from "@/lib/taskManager/getTask";
import { TaskItemType } from "@/types/TaskItemType";
import { useEffect, useState } from "react";

export default function Home() {
  const [completeList, setCompleteList] = useState<TaskItemType[]>([]);
  const [inProgressList, setInProgressList] = useState<TaskItemType[]>([]);
  const [incompleteList, setIncompleteList] = useState<TaskItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { complete, inProgress, incomplete } = await getTask();
      setCompleteList(complete);
      setInProgressList(inProgress);
      setIncompleteList(incomplete);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="flex-1 flex flex-col gap-3 bg-sofka-light justify-center">
        <div className="max-w-7xl flex flex-col w-full mx-auto gap-y-4">
          <h1 className="text-2xl font-semibold mt-2">Cargando tareas...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col gap-3 bg-sofka-light justify-center pb-4">
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
