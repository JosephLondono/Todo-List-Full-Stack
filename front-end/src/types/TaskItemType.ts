export interface TaskItemType {
  id: number;
  title: string;
  description: string;
  dateEnd: string;
  status: "incomplete" | "inProgress" | "complete";
}
