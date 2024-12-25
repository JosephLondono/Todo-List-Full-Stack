import { getCookie } from "cookies-next";
import { TaskItemType } from "@/types/TaskItemType";

export const saveTask = async (tasks: TaskItemType[]) => {
  const errors: string[] = [];
  const token = getCookie("accesToken");

  const results = await Promise.allSettled(
    tasks.map(async (task) => {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_URL_PROD_BACKEND ||
          process.env.NEXT_PUBLIC_URL_DEV_BACKEND
        }/api/v1/task/updateStatus`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: task.id, status: task.status }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error al actualizar la tarea ${task.id}`);
      }

      const updatedTask = await response.json();
      return updatedTask;
    })
  );

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      errors.push(`No se puede actualizar la tarea ${tasks[index].id}.`);
      console.error("Error al actualizar la tarea:", result.reason);
    }
  });

  return errors;
};
