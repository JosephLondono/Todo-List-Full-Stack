import { TaskItemType } from "@/types/TaskItemType";

export const getTask = () => {
  return Object.groupBy(getAllTask(), (task) => {
    return task.status;
  });
};

const getAllTask = () => {
  const allTask: TaskItemType[] = [
    {
      id: "1",
      title: "Tarea 1",
      description: "Beth has a new mix-tape she wants you to listen to.",
      status: "incomplete",
    },
    {
      id: "2",
      title: "Tarea 2",
      description: "Beth has a new mix-tape she wants you to listen to.",
      status: "incomplete",
    },
    {
      id: "3",
      title: "Tarea 3",
      description: "Beth has a new mix-tape she wants you to listen to.",
      status: "inProgress",
    },
    {
      id: "4",
      title: "Tarea 4",
      description: "Beth has a new mix-tape she wants you to listen to.",
      status: "complete",
    },
  ];
  return allTask;
};
