import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { v1 } from "uuid";
import { TodoListType } from "../../constants/types";
import { addTask, todoListId_1, todoListId_2 } from "./tasks.slice";
import { todoListAPI } from "../../api/todoistAPI";
import TodoList from "../../components/TodoList/TodoList";

const initialState: TodoListType[] = [
  // { id: todoListId_1, title: "initial todo", filter: "all" },
  // { id: todoListId_2, title: "initial todo", filter: "all" },
];

const todoListsSlice = createSlice({
  name: "todoLists",
  initialState,
  reducers: {
    setTodoLists: (state, action) => {
      return [...action.payload.todoLists].map((todolist) => {
        return { ...todolist, filter: "all" };
      });
    },
    addTodoList: (state, action) => {
      console.log(action.payload.newTodo);

      return [action.payload.newTodo, ...state];
    },
    removeTodoList: (state, action) => {
      return state.filter(
        (todolist) => todolist.id !== action.payload.todoListId
      );
    },

    changeTodoListTitle: (state, action) => {
      return state.map((todolist) =>
        todolist.id === action.payload.todoListId
          ? { ...todolist, title: action.payload.title }
          : todolist
      );
    },
    changeTodoListFilter: (state, action) => {
      const searchedIndex = state.findIndex(
        (i) => i.id === action.payload.todoListId
      );
      state[searchedIndex].filter = action.payload.newFilterValue;
    },
  },
});

export const getTodoTC = () => async (dispatch: Dispatch) => {
  todoListAPI.getTodo().then((res) => {
    dispatch(setTodoLists({ todoLists: res.data }));
  });
};
export const addTodoTC = (title: string) => async (dispatch: Dispatch) => {
  todoListAPI.createTodo(title).then((res) => {
    dispatch(addTodoList({ newTodo: res.data.data.item }));
  });
};
export const removeTodoTC = (todoListId: string) => (dispatch: Dispatch) => {
  todoListAPI.deleteTodo(todoListId).then((res) => {
    dispatch(removeTodoList({ todoListId: todoListId }));
  });
};
export const changeTodoTitleTC =
  (todoListId: string, title: string) => async (dispatch: Dispatch) => {
    todoListAPI.changeTodoTitle(todoListId, title).then((res) => {
      dispatch(changeTodoListTitle({ todoListId: todoListId, title: title }));
    });
  };

export const {
  setTodoLists,
  addTodoList,
  removeTodoList,
  changeTodoListTitle,
  changeTodoListFilter,
} = todoListsSlice.actions;
export default todoListsSlice.reducer;
