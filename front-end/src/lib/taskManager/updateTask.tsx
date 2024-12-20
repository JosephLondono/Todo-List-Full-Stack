import { getCookie } from "cookies-next";
import { TaskItemType } from "@/types/TaskItemType";

export const updateTask = async (task: Partial<TaskItemType>) => {
  const token = getCookie("accesToken");
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_URL_PROD_BACKEND ||
        process.env.NEXT_PUBLIC_URL_DEV_BACKEND
      }/api/v1/task`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      }
    );
    const updatedTask = await res.json();
    return updatedTask;
  } catch (error) {
    console.error(error);
    return [];
  }
};
