import React, { FC, useCallback, useState } from "react";
import s from "./todoList.module.css";
import { UilArrowRight, UilTrashAlt } from "@iconscout/react-unicons";
import Task from "../Task/Task";
import { RootStateType } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { FilterValuesType, TodoListsList } from "../../constants/types";
import AddItemForm from "../AddItemForm/AddItemForm";
import { addTask } from "../../store/slices/tasks.slice";
import {
  changeTodoListFilter,
  removeTodoList,
} from "../../store/slices/todoLists.slice";
import EditableSpan from "../EditableSpan/EditableSpan";
import RadioButton from "../RadioButton/RadioButton";

type TodoListProps = {
  todoListId: string;
  todoListTitle: string;
  todoListFilter: string;
};

const TodoList: FC<TodoListProps> = React.memo((props) => {
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

  const addTaskHandler = useCallback(() => {
    dispatch(
      addTask({
        newTaskTitle: addTaskInputValue,
        todoListId: props.todoListId,
      })
    );
    setAddTaskInputValue("");
  }, [addTaskInputValue, props.todoListId, dispatch]);

  const addTaskInputSetter = useCallback((value: string) => {
    setAddTaskInputValue(value);
  }, []);

  const removeTodoListHandler = useCallback(() => {
    dispatch(
      removeTodoList({
        todoListId: props.todoListId,
      })
    );
  }, [props.todoListId, dispatch]);

  const changeTodoListFilterHandler = useCallback(
    (filterValue: FilterValuesType) => {
      dispatch(
        changeTodoListFilter({
          todoListId: props.todoListId,
          newFilterValue: filterValue,
        })
      );
    },
    [props.todoListId, dispatch]
  );

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
        <UilTrashAlt onClick={removeTodoListHandler} className={s.deleteButton}/>
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
        <RadioButton
          name="filter"
          onClick={() => {
            changeTodoListFilterHandler("all");
          }}
        >
          All
        </RadioButton>
        <RadioButton
          name="filter"
          onClick={() => {
            changeTodoListFilterHandler("done");
          }}
        >
          Done
        </RadioButton>
        <RadioButton
          name="filter"
          onClick={() => {
            changeTodoListFilterHandler("notDone");
          }}
        >
          Not Done
        </RadioButton>
      </div>
    </div>
  );
});

export default TodoList;
