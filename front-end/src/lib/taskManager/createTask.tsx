import { getCookie } from "cookies-next";
import { TaskItemType } from "@/types/TaskItemType";

export const createTask = async (task: Partial<TaskItemType>) => {
  const token = getCookie("accesToken");
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_URL_PROD_BACKEND ||
        process.env.NEXT_PUBLIC_URL_DEV_BACKEND
      }/api/v1/task`,
      {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "true",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      }
    );
    const createdTask = await res.json();
    return createdTask;
  } catch (error) {
    console.error(error);
    return [];
  }
};
