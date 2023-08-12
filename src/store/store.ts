import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./slices/tasks.slice";
import todoListsSlice from "./slices/todoLists.slice";
import authSlice from "./slices/auth.slice";
import appSlice from "./slices/app.slice";

const store = configureStore({
  reducer: {
    app: appSlice,
    auth: authSlice,
    todoLists: todoListsSlice,
    tasks: tasksSlice,
  },
  devTools: true,
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;

// @ts-ignore
window.store = store;

export default store;
