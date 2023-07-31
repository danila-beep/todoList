import { TaskType } from "../api/todoistAPI";

export type TodoListType = {
  id: string;
  addedDate: string;
  order: string;
  title: string;
  filter: FilterValuesType;
};

export type TodoListsState = {
  todoLists: TodoListType[];
  isFetching: boolean;
};

export type FilterValuesType = "all" | "done" | "notDone";

export type tasksState = {
  tasks: {
    [key: string]: Array<TaskType>;
  };
  isFetching: boolean;
};
