import { TaskItemType } from "@/types/TaskItemType";
import { Session } from "next-auth";
import { toast } from "react-toastify";

export const getTask = async (session: Session) => {
  const task = await fetchingData(session);

  const { complete = [], inProgress = [], incomplete = [] } = orderTask(task);

  return { complete, inProgress, incomplete };
};

const fetchingData = async (session: Session) => {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_URL_PROD_BACKEND ||
        process.env.NEXT_PUBLIC_URL_DEV_BACKEND
      }/api/v1/task`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session.accessToken}`,
        },
      }
    );
    const tasks: TaskItemType[] = await res.json();

    return tasks;
  } catch (error) {
    toast.error("Error al obtener las tareas", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.error(error);
    return [];
  }
};

const orderTask = (task: TaskItemType[]) => {
  return Object.groupBy(task, (task) => {
    return task.status;
  });
};
