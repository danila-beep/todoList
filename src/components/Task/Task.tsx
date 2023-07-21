import React, { FC } from "react";
import s from "./task.module.css";
import { UilTrashAlt, UilUser } from "@iconscout/react-unicons";
import { useDispatch } from "react-redux";
import { changeTaskStatus, removeTask } from "../../store/slices/tasks.slice";
import CheckBox from "../CheckBox/CheckBox";
import EditableSpan from "../EditableSpan/EditableSpan";

type TaskPropsType = {
  todoListId: string;
  taskId: string;
  taskTitle: string;
  taskIsDone: boolean;
};

const Task: FC<TaskPropsType> = (props) => {
  const dispatch = useDispatch();

  const removeButtonHandler = () => {
    dispatch(
      removeTask({
        todoListId: props.todoListId,
        taskId: props.taskId,
      })
    );
  };

  const changeTaskStatusHandler = () => {
    dispatch(
      changeTaskStatus({
        todoListId: props.todoListId,
        taskId: props.taskId,
      })
    );
  };

  return (
    <div className={s.taskWrapper}>
      <div className={s.taskBody}>
        <h3>
          <EditableSpan
            elementId={props.taskId}
            todoListId={props.todoListId}
            elementTitle={props.taskTitle}
            spanFor={"task"}
          />
        </h3>
        <CheckBox
          isChecked={props.taskIsDone}
          onChange={changeTaskStatusHandler}
        />
      </div>
      <div className={s.taskFooter}>
        <div className={s.users}>
          <div>
            <UilUser size={15} />
          </div>
          <div>
            <UilUser size={15} />
          </div>
          <div>
            <UilUser size={15} />
          </div>
        </div>
        <UilTrashAlt className={s.deleteIcon} onClick={removeButtonHandler} />
      </div>
    </div>
  );
};

export default Task;
