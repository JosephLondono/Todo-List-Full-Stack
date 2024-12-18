export interface TaskItemType {
  id: string;
  title: string;
  description: string;
  status: "incomplete" | "inProgress" | "complete";
}
