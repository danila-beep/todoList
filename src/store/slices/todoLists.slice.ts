import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit"
import { TodoListType } from "constants/types"
import { GetTodoListsResponseType, RESULT_CODES, todoListAPI } from "api/todoistAPI"
import {
    handleNetworkError,
    handleServerError,
} from "utils/errorHandlers/appErrorHandlers"
import { authActions } from "./auth.slice"
import { appActions } from "./app.slice"

//reducer
const slice = createSlice({
    name: "todoLists",
    initialState: {
        todoLists: [] as TodoListType[],
        isFetching: true,
    },
    reducers: {
        setTodoLists: (state, action: PayloadAction<{ todoLists: GetTodoListsResponseType[] }>) => {
            state.isFetching = false
            return action.payload.todoLists.forEach((todo) => {
                state.todoLists.push({ ...todo, filter: "all" })
            })
        },
        addTodoList: (state, action: PayloadAction<{ newTodo: GetTodoListsResponseType }>) => {
            state.todoLists.unshift({ ...action.payload.newTodo, filter: "all" })
        },
        removeTodoList: (state, action: PayloadAction<{ todoListId: string }>) => {
            const index = state.todoLists.findIndex((todo) => todo.id === action.payload.todoListId)
            state.todoLists.splice(index, 1)
        },
        changeTodoListTitle: (
            state,
            action: PayloadAction<{ todoListId: string; title: string }>,
        ) => {
            const index = state.todoLists.findIndex((todo) => todo.id === action.payload.todoListId)
            state.todoLists[index].title = action.payload.title
        },
        changeTodoListFilter: (state, action) => {
            const index = state.todoLists.findIndex((todo) => todo.id === action.payload.todoListId)
            state.todoLists[index].filter = action.payload.newFilterValue
        },
    },
    extraReducers(builder) {
        builder.addCase(authActions.logout, (state, action) => {
            state.isFetching = true
            state.todoLists = []
        })
    },
})

export const todoListsReducer = slice.reducer
export const todoListsActions = slice.actions

//thunks
export const getTodoTC = () => async (dispatch: Dispatch) => {
    appActions.setAppStatus({ appStatus: "loading" })
    todoListAPI
        .getTodo()
        .then((res) => {
            dispatch(todoListsActions.setTodoLists({ todoLists: res.data }))
            appActions.setAppStatus({ appStatus: "idle" })
        })
        .catch((error) => {
            handleNetworkError(error, dispatch)
        })
}
export const addTodoTC = (title: string) => async (dispatch: Dispatch) => {
    appActions.setAppStatus({ appStatus: "loading" })
    todoListAPI
        .createTodo(title)
        .then((res) => {
            if (res.data.resultCode === RESULT_CODES.OK) {
                dispatch(todoListsActions.addTodoList({ newTodo: res.data.data.item }))
                appActions.setAppStatus({ appStatus: "idle" })
            } else {
                handleServerError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleNetworkError(error, dispatch)
        })
}
export const removeTodoTC = (todoListId: string) => (dispatch: Dispatch) => {
    appActions.setAppStatus({ appStatus: "loading" })
    todoListAPI
        .deleteTodo(todoListId)
        .then((res) => {
            if (res.data.resultCode === RESULT_CODES.OK) {
                dispatch(todoListsActions.removeTodoList({ todoListId: todoListId }))
                appActions.setAppStatus({ appStatus: "idle" })
            } else {
                handleServerError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleNetworkError(error, dispatch)
        })
}
export const changeTodoTitleTC =
    (todoListId: string, title: string) => async (dispatch: Dispatch) => {
        appActions.setAppStatus({ appStatus: "loading" })
        todoListAPI
            .changeTodoTitle(todoListId, title)
            .then((res) => {
                if (res.data.resultCode === RESULT_CODES.OK) {
                    dispatch(
                        todoListsActions.changeTodoListTitle({
                            todoListId: todoListId,
                            title: title,
                        }),
                    )
                    appActions.setAppStatus({ appStatus: "idle" })
                } else {
                    handleServerError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleNetworkError(error, dispatch)
            })
    }
