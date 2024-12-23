"use client";
import { Task } from "@/components/index/task-container/Task";
import { getTask } from "@/lib/taskManager/getTask";
import { TaskItemType } from "@/types/TaskItemType";
import { useEffect, useState } from "react";
import Link from "next/link";
import "@/app/spinnerLoader.css";
import { getCookie } from "cookies-next/client";

export default function Home() {
  const [completeList, setCompleteList] = useState<TaskItemType[]>([]);
  const [inProgressList, setInProgressList] = useState<TaskItemType[]>([]);
  const [incompleteList, setIncompleteList] = useState<TaskItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const token = getCookie("accesToken");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    async function fetchData() {
      const {
        complete = [],
        inProgress = [],
        incomplete = [],
      } = await getTask();
      setLoading(false);
      setCompleteList(complete);
      setInProgressList(inProgress);
      setIncompleteList(incomplete);
    }
    fetchData();
  }, [token]);

  if (loading) {
    return (
      <main className="flex-1 flex flex-col gap-3 bg-sofka-light min-h-[83vh]">
        <div className="max-w-7xl w-full mx-auto gap-y-4 flex-1">
          <h1 className="text-2xl font-semibold mt-2 px-7">
            Cargando tareas...
          </h1>
          <div className="absolute z-50 flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="loader"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col bg-sofka-light min-h-[83vh] relative">
      {token ? (
        <div className="max-w-7xl flex flex-col w-full mx-auto flex-grow">
          <Task
            incompleteList={incompleteList}
            inProgressList={inProgressList}
            completeList={completeList}
          />
        </div>
      ) : (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 w-full h-full">
          <div className="flex flex-col items-center space-y-6 p-8 bg-gray-800 bg-opacity-75 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-white text-center">
              ¡Bienvenido al Gestor de Tareas!
            </h1>
            <p className="text-lg text-gray-200 text-center">
              Inicia sesión para ver y gestionar tus tareas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link
                href="/auth"
                className="px-6 py-3 bg-sofka-orange text-white rounded-lg hover:bg-sofka-orange/80 transition-colors duration-200 text-center"
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
