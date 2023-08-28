import { authReducer } from "./slices/auth.slice"
import { appReducer } from "./slices/app.slice"
import { todoListsReducer } from "./slices/todoLists.slice"
import { tasksReducer } from "./slices/tasks.slice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { colorPaletteReducer } from "./slices/colorPalette.slice"
import { userReducer } from "./slices/user.slice"

const reducer = {
    app: appReducer,
    user: userReducer,
    theme: colorPaletteReducer,
    auth: authReducer,
    todoLists: todoListsReducer,
    tasks: tasksReducer,
}

const store = configureStore({ reducer })

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch
export const useAppDispatch: () => AppDispatchType = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector


// @ts-ignore
window.store = store

export default store
