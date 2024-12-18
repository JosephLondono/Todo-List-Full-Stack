export interface TaskItemType {
  id: string;
  title: string;
  description: string;
  dateEnd: string;
  status: "incomplete" | "inProgress" | "complete";
}
