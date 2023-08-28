import axios, { AxiosResponse } from "axios"

const todoListInstance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {},
})

export const auth = {
    login: (data: AuthDataType) => {
        return todoListInstance.post<
            null,
            AxiosResponse<AuthResponseType<{ userId: number }>>,
            AuthDataType
        >("auth/login", data)
    },
    me: () => {
        return todoListInstance.get<AuthResponseType<{ id: number; email: string; login: string }>>(
            "auth/me",
        )
    },
    logout: () => {
        return todoListInstance.delete<AuthResponseType>("auth/login")
    },
}

export type AuthResponseType<D = {}> = {
    resultCode: RESULT_CODES
    messages: string[]
    data: D
}

export type AuthDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export const todoListAPI = {
    getTodo: () => {
        const promise = todoListInstance.get<GetTodoListsResponseType[]>("todo-lists")
        return promise
    },
    createTodo: (title: string) => {
        const promise = todoListInstance.post<
            null,
            AxiosResponse<ResponseType<{ item: GetTodoListsResponseType }>>,
            { title: string }
        >("todo-lists", { title })
        return promise
    },
    deleteTodo: (todoListId: string) => {
        const promise = todoListInstance.delete<ResponseType>(`todo-lists/${todoListId}`)
        return promise
    },
    changeTodoTitle: (todoListId: string, title: string) => {
        const promise = todoListInstance.put<null, AxiosResponse<ResponseType>, { title: string }>(
            `todo-lists/${todoListId}`,
            {
                title,
            },
        )
        return promise
    },
    getTasks: (todoListId: string) => {
        return todoListInstance.get<GetTasksResponseType>(`todo-lists/${todoListId}/tasks`)
    },
    createTask: (todoListId: string, title: string) => {
        return todoListInstance.post<
            null,
            AxiosResponse<ResponseType<{ item: TaskType }>>,
            { title: string }
        >(`todo-lists/${todoListId}/tasks`, { title: title })
    },
    deleteTask: (todoListId: string, taskId: string) => {
        return todoListInstance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    },
    changeTaskTitle: (todoListId: string, taskId: string, title: string) => {
        return todoListInstance.put<
            null,
            AxiosResponse<ResponseType<{ item: TaskType }>>,
            { title: string }
        >(`todo-lists/${todoListId}/tasks/${taskId}`, {
            title: title,
        })
    },
    changeTaskStatus: (todoListId: string, taskId: string, updatedTask: TaskType) => {
        return todoListInstance.put<
            null,
            AxiosResponse<ResponseType<{ item: TaskType }>>,
            TaskType
        >(`todo-lists/${todoListId}/tasks/${taskId}`, updatedTask)
    },
}

export type ResponseType<I = {}> = {
    data: I
    resultCode: RESULT_CODES
    messages: string[]
}

export enum RESULT_CODES {
    OK = 0,
    ERROR = 1,
    CAPCHAERROR = 10,
}

export type GetTodoListsResponseType = {
    id: string
    addedDate: string
    order: string
    title: string
}

export type GetTasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}
