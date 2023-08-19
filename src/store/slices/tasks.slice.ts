import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RESULT_CODES, TaskStatuses, TaskType, todoListAPI } from "api/todoistAPI"
import { RootStateType } from "../store"
import { todoListsActions } from "./todoLists.slice"
import { authActions } from "./auth.slice"
import { appActions } from "./app.slice"
import { handleNetworkError, handleServerError } from "utils/errorHandlers/appErrorHandlers"

const slice = createSlice({
    name: "tasks",
    initialState: {
        tasks: {} as TasksType,
        isFetching: true,
    },
    reducers: {
        setTasks: (state, action: PayloadAction<{ todoListId: string; tasks: TaskType[] }>) => {
            return action.payload.tasks.forEach((task) => {
                state.tasks[action.payload.todoListId].push(task)
                state.isFetching = false
            })
        },
        reorderTasks: (
            state,
            action: PayloadAction<{ todoListId: string; reorderedTasksState: TaskType[] }>,
        ) => {
            state.tasks[action.payload.todoListId] = action.payload.reorderedTasksState
        },
        addTask: (state, action: PayloadAction<{ todoListId: string; task: TaskType }>) => {
            state.tasks[action.payload.todoListId].unshift(action.payload.task)
        },
        removeTask: (state, action: PayloadAction<{ todoListId: string; taskId: string }>) => {
            const index = state.tasks[action.payload.todoListId].findIndex(
                (task) => task.id === action.payload.taskId,
            )
            state.tasks[action.payload.todoListId].splice(index, 1)
        },
        changeTaskTitle: (
            state,
            action: PayloadAction<{ todoListId: string; taskId: string; title: string }>,
        ) => {
            const index = state.tasks[action.payload.todoListId].findIndex(
                (task) => task.id === action.payload.taskId,
            )
            state.tasks[action.payload.todoListId][index].title = action.payload.title
        },
        changeTaskStatus: (
            state,
            action: PayloadAction<{ todoListId: string; taskId: string }>,
        ) => {
            const index = state.tasks[action.payload.todoListId].findIndex(
                (ti) => ti.id === action.payload.taskId,
            )
            if (state.tasks[action.payload.todoListId][index].status === TaskStatuses.Completed) {
                state.tasks[action.payload.todoListId][index].status = TaskStatuses.New
            } else {
                state.tasks[action.payload.todoListId][index].status = TaskStatuses.Completed
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(todoListsActions.addTodoList, (state, action) => {
                state.tasks[action.payload.newTodo.id] = []
                state.isFetching = false
            })
            .addCase(todoListsActions.setTodoLists, (state, action) => {
                action.payload.todoLists.forEach((todo) => {
                    state.tasks[todo.id] = []
                })
            })
            .addCase(todoListsActions.removeTodoList, (state, action) => {
                delete state.tasks[action.payload.todoListId]
            })
            .addCase(authActions.logout, (state, action) => {
                state.isFetching = true
                state.tasks = {}
            })
    },
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions

export const getTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    appActions.setAppStatus({ appStatus: "loading" })
    todoListAPI
        .getTasks(todoListId)
        .then((res) => {
            if (res.data.error === null) {
                dispatch(tasksActions.setTasks({ tasks: res.data.items, todoListId: todoListId }))
                appActions.setAppStatus({ appStatus: "idle" })
            } else {
                handleServerError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleNetworkError(err, dispatch)
        })
}
export const addTaskTC = (todoListId: string, title: string) => async (dispatch: Dispatch) => {
    appActions.setAppStatus({ appStatus: "loading" })
    todoListAPI
        .createTask(todoListId, title)
        .then((res) => {
            if (res.data.resultCode === RESULT_CODES.OK) {
                dispatch(tasksActions.addTask({ todoListId, task: res.data.data.item }))
                appActions.setAppStatus({ appStatus: "idle" })
            } else {
                handleServerError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleNetworkError(err, dispatch)
        })
}
export const removeTaskTC = (todoListId: string, taskId: string) => async (dispatch: Dispatch) => {
    appActions.setAppStatus({ appStatus: "loading" })
    todoListAPI
        .deleteTask(todoListId, taskId)
        .then((res) => {
            if (res.data.resultCode === RESULT_CODES.OK) {
                dispatch(tasksActions.removeTask({ todoListId, taskId }))
                appActions.setAppStatus({ appStatus: "idle" })
            } else {
                handleServerError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleNetworkError(err, dispatch)
        })
}
export const changeTaskTitleTC =
    (todoListId: string, taskId: string, title: string) => async (dispatch: Dispatch) => {
        appActions.setAppStatus({ appStatus: "loading" })
        todoListAPI
            .changeTaskTitle(todoListId, taskId, title)
            .then((res) => {
                if (res.data.resultCode === RESULT_CODES.OK) {
                    dispatch(tasksActions.changeTaskTitle({ todoListId, taskId, title }))
                    appActions.setAppStatus({ appStatus: "idle" })
                } else {
                    handleServerError(res.data, dispatch)
                }
            })
            .catch((err) => {
                handleNetworkError(err, dispatch)
            })
    }
export const changeTaskStatusTC =
    (todoListId: string, taskId: string, status: TaskStatuses) =>
    async (dispatch: Dispatch, getState: () => RootStateType) => {
        appActions.setAppStatus({ appStatus: "loading" })
        const allTasksFromState = getState().tasks.tasks
        const tasksForCurrentTodolist = allTasksFromState[todoListId]
        const task = tasksForCurrentTodolist.find((t) => {
            return t.id === taskId
        })

        if (task) {
            todoListAPI
                .changeTaskStatus(todoListId, taskId, {
                    ...task,
                    status: status,
                })
                .then((res) => {
                    if (res.data.resultCode === RESULT_CODES.OK) {
                        dispatch(tasksActions.changeTaskStatus({ todoListId, taskId }))
                        appActions.setAppStatus({ appStatus: "idle" })
                    } else {
                        handleServerError(res.data, dispatch)
                    }
                })
                .catch((err) => {
                    handleNetworkError(err, dispatch)
                })
        }
    }

export type TasksType = {
    [todoListId: string]: TaskType[]
}
