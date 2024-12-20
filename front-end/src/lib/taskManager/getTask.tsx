import { TaskItemType } from "@/types/TaskItemType";
import { getCookie } from "cookies-next/client";

export const getTask = async () => {
  const task = await fetchingData();

  const { complete = [], inProgress = [], incomplete = [] } = orderTask(task);
  console.log("Complete: ", complete);
  console.log("In Progress: ", inProgress);
  console.log("Incomplete: ", incomplete);

  return { complete, inProgress, incomplete };
};

const fetchingData = async () => {
  const token = getCookie("accesToken");
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_URL_PROD_BACKEND ||
        process.env.NEXT_PUBLIC_URL_DEV_BACKEND
      }/api/v1/task`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const tasks: TaskItemType[] = await res.json();

    return tasks;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const orderTask = (task: TaskItemType[]) => {
  return Object.groupBy(task, (task) => {
    return task.status;
  });
};
