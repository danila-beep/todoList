import React, { FC, useState } from "react";
import s from "./todoList.module.css";
import { UilArrowRight, UilTrashAlt } from "@iconscout/react-unicons";
import Task from "../Task/Task";
import { RootStateType } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { TodoListsList } from "../../constants/types";
import AddItemForm from "../AddItemForm/AddItemForm";
import { addTask } from "../../store/slices/tasks.slice";
import {
  changeTodoListFilter,
  removeTodoList,
} from "../../store/slices/todoLists.slice";
import EditableSpan from "../EditableSpan/EditableSpan";

type TodoListProps = {
  todoListId: string;
  todoListTitle: string;
  todoListFilter: string;
};

const TodoList: FC<TodoListProps> = (props) => {
  const tasks = useSelector<RootStateType, TodoListsList>(
    (state) => state.tasks
  );
  const dispatch = useDispatch();

  let tasksForRender = tasks[props.todoListId];

  if (props.todoListFilter === "notDone") {
    tasksForRender = tasks[props.todoListId].filter((t) => t.isDone === false);
  }
  if (props.todoListFilter === "done") {
    tasksForRender = tasks[props.todoListId].filter((t) => t.isDone === true);
  }

  const [addTaskInputValue, setAddTaskInputValue] = useState("");

  const addTaskHandler = () => {
    dispatch(
      addTask({
        newTaskTitle: addTaskInputValue,
        todoListId: props.todoListId,
      })
    );
    setAddTaskInputValue("");
  };

  const addTaskInputSetter = (value: string) => {
    setAddTaskInputValue(value);
  };

  const removeTodoListHandler = () => {
    dispatch(
      removeTodoList({
        todoListId: props.todoListId,
      })
    );
  };

  return (
    <div className={s.todoListWrapper}>
      <div className={s.todoListHeader}>
        <UilArrowRight />
        <h3>
          <EditableSpan
            elementId={props.todoListId}
            elementTitle={props.todoListTitle}
            todoListId={props.todoListId}
            spanFor={"todolist"}
          />
        </h3>
        <UilTrashAlt onClick={removeTodoListHandler} />
      </div>
      <AddItemForm
        addingElement={"Task"}
        onClick={addTaskHandler}
        value={addTaskInputValue}
        onChange={addTaskInputSetter}
        centered
      />
      <div className={s.todoListTasksWrapper}>
        {tasksForRender?.map((task) => {
          return (
            <Task
              key={task.id}
              todoListId={props.todoListId}
              taskId={task.id}
              taskTitle={task.title}
              taskIsDone={task.isDone}
            />
          );
        })}
      </div>
      <div className={s.filterWrapper}>
        <span
          onClick={() =>
            dispatch(
              changeTodoListFilter({
                todoListId: props.todoListId,
                newFilterValue: "all",
              })
            )
          }
        >
          All
        </span>
        <span
          onClick={() =>
            dispatch(
              changeTodoListFilter({
                todoListId: props.todoListId,
                newFilterValue: "done",
              })
            )
          }
        >
          Done
        </span>
        <span
          onClick={() =>
            dispatch(
              changeTodoListFilter({
                todoListId: props.todoListId,
                newFilterValue: "notDone",
              })
            )
          }
        >
          Not Done
        </span>
      </div>
    </div>
  );
};

export default TodoList;
