import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { v1 } from "uuid";
import { TodoListType, TodoListsState } from "../../constants/types";
import { addTask, todoListId_1, todoListId_2 } from "./tasks.slice";
import { TodoListsType, todoListAPI } from "../../api/todoistAPI";
import TodoList from "../../components/TodoList/TodoList";
import { setAppError } from "./app.slice";
import { error } from "console";
import {
  ErrorEnums,
  handleNetworkError,
  handleServerError,
} from "../../utils/errorHandlers/appErrorHandlers";

const initialState: TodoListsState = {
  todoLists: [],
  isFetching: true,
};

//reducer
const todoListsSlice = createSlice({
  name: "todoLists",
  initialState,
  reducers: {
    setTodoLists: (state, action) => {
      return {
        todoLists: [...action.payload.todoLists].map((todolist) => {
          return { ...todolist, filter: "all" };
        }),
        isFetching: false,
      };
    },
    reorderTodoLists: (state, action) => {},
    addTodoList: (state, action) => {
      return {
        ...state,
        todoLists: [action.payload.newTodo, ...state.todoLists],
      };
    },
    removeTodoList: (state, action) => {
      return {
        ...state,
        todoLists: state.todoLists.filter(
          (todolist) => todolist.id !== action.payload.todoListId
        ),
      };
    },

    changeTodoListTitle: (state, action) => {
      return {
        ...state,
        todoLists: state.todoLists.map((todolist) =>
          todolist.id === action.payload.todoListId
            ? { ...todolist, title: action.payload.title }
            : todolist
        ),
      };
    },
    changeTodoListFilter: (state, action) => {
      const searchedIndex = state.todoLists.findIndex(
        (i) => i.id === action.payload.todoListId
      );
      state.todoLists[searchedIndex].filter = action.payload.newFilterValue;
    },
  },
});

//thunks
export const getTodoTC = () => async (dispatch: Dispatch) => {
  todoListAPI
    .getTodo()
    .then((res) => {
      dispatch(setTodoLists({ todoLists: res.data }));
    })
    .catch((error) => {
      handleNetworkError(error, dispatch);
    });
};
export const addTodoTC = (title: string) => async (dispatch: Dispatch) => {
  todoListAPI
    .createTodo(title)
    .then((res) => {
      if (res.data.resultCode === ErrorEnums.OK) {
        dispatch(addTodoList({ newTodo: res.data.data.item }));
      } else {
        handleServerError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleNetworkError(error, dispatch);
    });
};
export const removeTodoTC = (todoListId: string) => (dispatch: Dispatch) => {
  todoListAPI
    .deleteTodo(todoListId)
    .then((res) => {
      if (res.data.resultCode === ErrorEnums.OK) {
        dispatch(removeTodoList({ todoListId: todoListId }));
      } else {
        handleServerError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleNetworkError(error, dispatch);
    });
};
export const changeTodoTitleTC =
  (todoListId: string, title: string) => async (dispatch: Dispatch) => {
    todoListAPI
      .changeTodoTitle(todoListId, title)
      .then((res) => {
        if (res.data.resultCode === ErrorEnums.OK) {
          dispatch(
            changeTodoListTitle({ todoListId: todoListId, title: title })
          );
        } else {
          handleServerError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleNetworkError(error, dispatch);
      });
  };

export const {
  setTodoLists,
  reorderTodoLists,
  addTodoList,
  removeTodoList,
  changeTodoListTitle,
  changeTodoListFilter,
} = todoListsSlice.actions;
export default todoListsSlice.reducer;
