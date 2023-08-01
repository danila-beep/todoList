import { Dispatch, createSlice } from "@reduxjs/toolkit";

import { v1 } from "uuid";
import { tasksState } from "../../constants/types";
import { TaskStatuses, todoListAPI } from "../../api/todoistAPI";
import { RootStateType } from "../store";

export const todoListId_1 = v1();
export const todoListId_2 = v1();
const initialState: tasksState = {
  tasks: {},
  isFetching: true,
};

//CRUD

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      return {
        tasks: {
          ...state.tasks,
          [action.payload.todoListId]: [...action.payload.tasks],
        },
        isFetching: false,
      };
    },
    reorderTasks: (state, action) => {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.todoListId]: [...action.payload.reorderedTasksState],
        },
      };
    },
    addTask: (state, action) => {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.task.todoListId]: [
            action.payload.task,
            ...state.tasks[action.payload.task.todoListId],
          ],
        },
      };
    },
    removeTask: (state, action) => {
      const searchedIndex = state.tasks[action.payload.todoListId].findIndex(
        (ti) => ti.id === action.payload.taskId
      );

      state.tasks[action.payload.todoListId]?.splice(searchedIndex, 1);
    },
    changeTaskTitle: (state, action) => {
      const searhedIndex = state.tasks[action.payload.todoListId]?.findIndex(
        (ti) => ti.id === action.payload.taskId
      );
      state.tasks[action.payload.todoListId][searhedIndex].title =
        action.payload.title;
    },
    changeTaskStatus: (state, action) => {
      const searhedIndex = state.tasks[action.payload.todoListId]?.findIndex(
        (ti) => ti.id === action.payload.taskId
      );
      if (state.tasks[action.payload.todoListId][searhedIndex].status === 2) {
        state.tasks[action.payload.todoListId][searhedIndex].status = 0;
      } else {
        state.tasks[action.payload.todoListId][searhedIndex].status = 2;
      }
    },
  },
});

export const getTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
  todoListAPI.getTasks(todoListId).then((res) => {
    dispatch(setTasks({ tasks: res.data.items, todoListId: todoListId }));
  });
};
export const addTaskTC =
  (todoListId: string, title: string) => async (dispatch: Dispatch) => {
    todoListAPI.createTask(todoListId, title).then((res) => {
      dispatch(addTask({ task: res.data.data.item }));
    });
  };
export const removeTaskTC =
  (todoListId: string, taskId: string) => async (dispatch: Dispatch) => {
    todoListAPI.deleteTask(todoListId, taskId).then((res) => {
      dispatch(removeTask({ todoListId, taskId }));
    });
  };
export const changeTaskTitleTC =
  (todoListId: string, taskId: string, title: string) =>
  async (dispatch: Dispatch) => {
    todoListAPI.changeTaskTitle(todoListId, taskId, title).then((res) => {
      dispatch(changeTaskTitle({ todoListId, taskId, title }));
    });
  };
export const changeTaskStatusTC =
  (todoListId: string, taskId: string, status: TaskStatuses) =>
  async (dispatch: Dispatch, getState: () => RootStateType) => {
    const allTasksFromState = getState().tasks.tasks;
    const tasksForCurrentTodolist = allTasksFromState[todoListId];
    const task = tasksForCurrentTodolist.find((t) => {
      return t.id === taskId;
    });

    if (task) {
      todoListAPI
        .changeTaskStatus(todoListId, taskId, {
          ...task,
          status: status,
        })
        .then(() => {
          dispatch(changeTaskStatus({ todoListId, taskId }));
        });
    }
  };

export const {
  setTasks,
  reorderTasks,
  addTask,
  removeTask,
  changeTaskTitle,
  changeTaskStatus,
} = tasksSlice.actions;
export default tasksSlice.reducer;
