import { authReducer } from "./slices/auth.slice"
import { appReducer } from "./slices/app.slice"
import { todoListsReducer } from "./slices/todoLists.slice"
import { tasksReducer } from "./slices/tasks.slice"
import { useDispatch, useSelector } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"

const reducer = {
    app: appReducer,
    auth: authReducer,
    todoLists: todoListsReducer,
    tasks: tasksReducer,
}

const store = configureStore({ reducer })

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch
export const useAppDispatch: () => AppDispatchType = useDispatch
export const useAppSelector = useSelector<RootStateType, unknown>

// @ts-ignore
window.store = store

export default store
