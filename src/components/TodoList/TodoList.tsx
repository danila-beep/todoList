import React, { FC, useCallback, useEffect, useState } from "react";
import s from "./todoList.module.css";
import { UilArrowRight, UilTrashAlt } from "@iconscout/react-unicons";
import Task from "../Task/Task";
import { RootStateType } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { FilterValuesType, TodoListsList } from "../../constants/types";
import AddItemForm from "../AddItemForm/AddItemForm";
import { addTask, addTaskTC, getTasksTC } from "../../store/slices/tasks.slice";
import {
  changeTodoListFilter,
  removeTodoTC,
} from "../../store/slices/todoLists.slice";
import EditableSpan from "../EditableSpan/EditableSpan";
import RadioButton from "../RadioButton/RadioButton";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import { TaskStatuses } from "../../api/todoistAPI";

type TodoListProps = {
  todoListId: string;
  todoListTitle: string;
  todoListFilter: string;
};

const TodoList: FC<TodoListProps> = React.memo((props) => {
  const tasks = useSelector<RootStateType, TodoListsList>(
    (state) => state.tasks
  );
  console.log(tasks);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasksTC(props.todoListId));
  }, []);

  const taskIsDoneChecker = (t: TaskStatuses) => {
    if (t > 0) {
      return true;
    } else return false;
  };

  let tasksForRender = tasks[props.todoListId];

  if (props.todoListFilter === "notDone") {
    tasksForRender = tasks[props.todoListId]?.filter(
      (t) => taskIsDoneChecker(t.status) === false
    );
  }
  if (props.todoListFilter === "done") {
    tasksForRender = tasks[props.todoListId]?.filter(
      (t) => taskIsDoneChecker(t.status) === true
    );
  }

  const [addTaskInputValue, setAddTaskInputValue] = useState("");

  const addTaskHandler = () => {
    dispatch(addTaskTC(props.todoListId, addTaskInputValue));
    setAddTaskInputValue("");
  };

  const addTaskInputSetter = useCallback((value: string) => {
    setAddTaskInputValue(value);
  }, []);

  const removeTodoListHandler = () => {
    dispatch(removeTodoTC(props.todoListId));
  };

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
        <UilTrashAlt
          onClick={removeTodoListHandler}
          className={s.deleteButton}
        />
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
              taskStatus={task.status}
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
function deleteTodoTC(todoListId: string): any {
  throw new Error("Function not implemented.");
}
