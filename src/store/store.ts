import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./slices/tasks.slice";
import todoListsSlice from "./slices/todoLists.slice";
import authSlice from "./slices/auth.slice";

const store = configureStore({
    reducer: {
        tasks: tasksSlice,
        todoLists: todoListsSlice,
        auth: authSlice,
    },
    devTools: true
})

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch

// @ts-ignore
window.store = store;

export default store