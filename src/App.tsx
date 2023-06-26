import React, { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatchType, RootStateType } from "./store/store";
import {
  addTask,
  changeTaskStatus,
  changeTaskTitle,
  removeTask,
} from "./store/slices/tasks.slice";

function App() {
  const tasks = useSelector((state: RootStateType) => state.tasks);
  const dispatch = useDispatch<AppDispatchType>();

  const [inputOfNewTaskValue, setInputOfNewTaskValue] = useState<string>("");
  const [changeTaskTitleInputValue, setChangeTaskTitleInputValue] =
    useState<string>("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputOfNewTaskTitle, setInputOfNewTaskTitle] = useState<string>("");

  function inputOfNewTaskHandler(event: ChangeEvent<HTMLInputElement>): void {
    setInputOfNewTaskValue(event.currentTarget.value);
  }

  function changeTaskTitleInputHandler(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    setChangeTaskTitleInputValue(event.currentTarget.value);
  }

  function buttonOfNewTaskHandler(event: MouseEvent<HTMLButtonElement>): void {
    dispatch(addTask(inputOfNewTaskValue));
    setInputOfNewTaskValue("");
  }

  function keyDownOfNewTaskHandler(
    event: KeyboardEvent<HTMLInputElement>
  ): void {
    if (event.key === "Enter") {
      dispatch(addTask(inputOfNewTaskValue));
      setInputOfNewTaskValue("");
    }
    return;
  }

  const inputOfNewTitleOnChangeHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    console.log("all works");
    
    setInputOfNewTaskTitle(event.currentTarget.value)
  };

  return (
    <>
      <div>
        <span>
          <input
            type="text"
            value={inputOfNewTaskValue}
            onChange={inputOfNewTaskHandler}
            onKeyDown={keyDownOfNewTaskHandler}
          />
        </span>
        <span>
          <button onClick={buttonOfNewTaskHandler}>Add Task</button>
        </span>
      </div>
      <div className="tasksList">
        {tasks.map((task) => (
          <div className="taskItem">
            <input type="checkbox" checked={task.isDone} onClick={() => dispatch(changeTaskStatus({taskId: task.id, newTaskStatus: !task.isDone}))}/>
            {isEditMode ? (
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    dispatch(
                        changeTaskTitle({
                          taskId: task.id,
                          newTaskTitle: inputOfNewTaskTitle,
                        })
                      );
                      setIsEditMode(false)
                  }
                }}
                value={inputOfNewTaskTitle}
                onChange={inputOfNewTitleOnChangeHandler}
              />
            ) : (
              <div onDoubleClick={() => setIsEditMode(!isEditMode)}>{task.title}</div>
            )}
            <span>
              <button onClick={() => dispatch(removeTask(task.id))}>
                remove task
              </button>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
