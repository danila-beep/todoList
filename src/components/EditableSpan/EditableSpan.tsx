import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import s from "./editableSpan.module.css";
import { changeTaskTitle } from "../../store/slices/tasks.slice";
import { useDispatch } from "react-redux";
import { AppDispatchType } from "../../store/store";
import { changeTodoListTitle } from "../../store/slices/todoLists.slice";

type EditableSpanPropsType = {
  elementId: string;
  elementTitle: string;
  todoListId: string;
  spanFor: "task" | "todolist";
};

const EditableSpan: FC<EditableSpanPropsType> = React.memo((props) => {
  const dispatch = useDispatch<AppDispatchType>();

  const [isEditMode, setIsEditMode] = useState(false);
  const [inputOfNewTaskTitle, setInputOfNewTaskTitle] = useState<string>("");

  const inputOfNewTitleOnChangeHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputOfNewTaskTitle(event.currentTarget.value);
  };

  const inputOnKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (props.spanFor === "task") {
        dispatch(
          changeTaskTitle({
            taskId: props.elementId,
            newTaskTitle: inputOfNewTaskTitle,
            todoListId: props.todoListId,
          })
        );
        setIsEditMode(false);
      } else {
        dispatch(
          changeTodoListTitle({
            todoListId: props.elementId,
            newTodoListTitle: inputOfNewTaskTitle,
          })
        );
        setIsEditMode(false);
      }
    }
  };

  return (
    <div className={s.editableSpanWrapper}>
      {isEditMode ? (
        <input
          onKeyDown={inputOnKeyDownHandler}
          value={inputOfNewTaskTitle}
          onChange={inputOfNewTitleOnChangeHandler}
        />
      ) : (
        <div onDoubleClick={() => setIsEditMode(!isEditMode)}>
          {props.elementTitle}
        </div>
      )}
      {isEditMode ? (
        <div className={s.helpMessage}>Type "Enter" to accept changes</div>
      ) : undefined}
    </div>
  );
});

export default EditableSpan;
