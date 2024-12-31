export interface TaskItemType {
  id: number;
  title: string;
  description: string;
  dateEnd: string;
  status: "incomplete" | "inProgress" | "complete";
  style:
    | "default"
    | "red"
    | "green"
    | "blue"
    | "yellow"
    | "orange"
    | "purple"
    | "pink";
}
