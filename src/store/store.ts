import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./slices/tasks.slice";
import todoListsSlice from "./slices/todoLists.slice";

const store = configureStore({
    reducer: {
        tasks: tasksSlice,
        todoLists: todoListsSlice
    },
    devTools: true
})

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch

export default store