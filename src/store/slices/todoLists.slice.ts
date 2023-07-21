import { createSlice } from "@reduxjs/toolkit";
import { v1 } from "uuid";
import { TodoListType } from "../../constants/types";
import { addTask, todoListId_1, todoListId_2 } from "./tasks.slice";

const initialState: TodoListType[] = [
  { id: todoListId_1, title: "initial todo", filter: "all" },
  { id: todoListId_2, title: "initial todo", filter: "all" },
];

const todoListsSlice = createSlice({
  name: "todoLists",
  initialState,
  reducers: {
    addTodoList: (state, action) => {
      const newTodoListId = v1();
      const newTodoList: TodoListType = {
        id: newTodoListId,
        title: action.payload.newTodoListTitle,
        filter: "all",
      };
      state.push(newTodoList);
    },
    removeTodoList: (state, action) => {
      const searchedIndex = state.findIndex(i => i.id === action.payload.todoListId);
      state.splice(searchedIndex, 1)
    },
    changeTodoListTitle: (state, action) => {
      const searchedIndex = state.findIndex(i => i.id === action.payload.todoListId);
      state[searchedIndex].title = action.payload.newTodoListTitle
    },
    changeTodoListFilter: (state, action) => {
      const searchedIndex = state.findIndex(i => i.id === action.payload.todoListId);
      state[searchedIndex].filter = action.payload.newFilterValue
    },
  },
});

export const { addTodoList, removeTodoList, changeTodoListTitle, changeTodoListFilter } = todoListsSlice.actions;
export default todoListsSlice.reducer;
