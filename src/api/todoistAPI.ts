import axios, { AxiosResponse } from "axios";

const todoListInstance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {},
});

export const todoListAPI = {
  getTodo: () => {
    const promise = todoListInstance.get<TodoListsType[]>("todo-lists");
    return promise;
  },
  createTodo: (title: string) => {
    const promise = todoListInstance.post<
      null,
      AxiosResponse<ResponseType<{ item: TodoListsType }>>,
      { title: string }
    >("todo-lists", { title });
    return promise;
  },
  deleteTodo: (todoListId: string) => {
    const promise = todoListInstance.delete<ResponseType>(
      `todo-lists/${todoListId}`
    );
    return promise;
  },
  changeTodoTitle: (todoListId: string, title: string) => {
    const promise = todoListInstance.put<ResponseType>(
      `todo-lists/${todoListId}`,
      { title }
    );
    return promise;
  },
  getTasks: (todoListId: string) => {
    return todoListInstance.get<TasksType>(
      `todo-lists/${todoListId}/tasks`
    );
  },
  createTask: (todoListId: string, title: string) => {
    return todoListInstance.post<
      null,
      AxiosResponse<TasksResponseType<{ item: TaskType }>>
    >(`todo-lists/${todoListId}/tasks`, { title: title });
  },
  deleteTask: (todoListId: string, taskId: string) => {
    return todoListInstance.delete<TasksResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
  },
  changeTaskTitle: (todoListId: string, taskId: string, title: string) => {
    return todoListInstance.put(`todo-lists/${todoListId}/tasks/${taskId}`, {title: title})
  },
  changeTaskStatus: (todoListId: string, taskId: string, updatedTask: TaskType) => {
    return todoListInstance.put(`todo-lists/${todoListId}/tasks/${taskId}`, updatedTask)
  }
};

export type TodoListsType = {
  id: string;
  addedDate: string;
  order: string;
  title: string;
};
export type TasksType = {
  items: TaskType[];
  totalCount: number;
  error: string;
};
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
  description: string;
  title: string;
  completed: boolean;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
export type TasksResponseType<I = {}> = {
  data: I;
  totalCount: number;
  error: string;
};

export type ResponseType<I = {}> = {
  data: I;
  fieldsErrors: Array<string>;
  messages: Array<string>;
  resultCode: 0;
};
