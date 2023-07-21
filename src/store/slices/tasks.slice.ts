import { createSlice } from "@reduxjs/toolkit";

import { v1 } from "uuid";
import { TodoListsList } from "../../constants/types";

export const todoListId_1 = v1();
export const todoListId_2 = v1();
const initialState: TodoListsList = {
  [todoListId_1]: [{ id: v1(), title: "initial task", isDone: false }],
  [todoListId_2]: [{ id: v1(), title: "initial task", isDone: false }],
};

//CRUD

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: v1(),
        title: action.payload.newTaskTitle,
        isDone: false,
      };
      if (state[action.payload.todoListId] === undefined) {
        state[action.payload.todoListId] = [];
        state[action.payload.todoListId]?.unshift(newTask);
      } else {
        state[action.payload.todoListId]?.unshift(newTask);
      }
    },
    removeTask: (state, action) => {
      console.log("remove task");

      console.log(state[action.payload.todoListId]);

      const searchedIndex = state[action.payload.todoListId].findIndex(
        (ti) => ti.id === action.payload.taskId
      );

      state[action.payload.todoListId]?.splice(searchedIndex, 1);
    },
    changeTaskTitle: (state, action) => {
      const searhedIndex = state[action.payload.todoListId]?.findIndex(
        (ti) => ti.id === action.payload.taskId
      );
      state[action.payload.todoListId][searhedIndex].title =
        action.payload.newTaskTitle;
    },
    changeTaskStatus: (state, action) => {
      const searhedIndex = state[action.payload.todoListId]?.findIndex(
        (ti) => ti.id === action.payload.taskId
      );
      state[action.payload.todoListId][searhedIndex].isDone = 
        !state[action.payload.todoListId][searhedIndex].isDone
    },
  },
});

export const { addTask, removeTask, changeTaskTitle, changeTaskStatus } =
  tasksSlice.actions;
export default tasksSlice.reducer;
