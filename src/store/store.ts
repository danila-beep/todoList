import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./slices/tasks.slice";

const store = configureStore({
    reducer: {
        tasks: tasksSlice
    },
    devTools: true
})

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch

export default store