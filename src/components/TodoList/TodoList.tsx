import React, { FC, useCallback, useEffect, useState } from "react";
import s from "./todoList.module.css";
import { UilArrowRight, UilTrashAlt } from "@iconscout/react-unicons";
import Task from "../Task/Task";
import { RootStateType } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { FilterValuesType, TodoListType, TodoListsState, tasksState } from "../../constants/types";
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
import Preloader from "../Preloader/Preloader";

type TodoListProps = {
  todoList: TodoListType
  draggable: boolean
  dragStartHandler: (e: React.DragEvent<HTMLDivElement>, card: TodoListType) => void
  dragLeaveHandler: (e: React.DragEvent<HTMLDivElement>) => void
  dragEndHandler: (e: React.DragEvent<HTMLDivElement>) => void
  dragOverHandler: (e: React.DragEvent<HTMLDivElement>) => void
  dropHandler: (e: React.DragEvent<HTMLDivElement>, card: TodoListType) => void
};

const TodoList: FC<TodoListProps> = React.memo((props) => {
  const tasksState = useSelector<RootStateType, tasksState>(
    (state) => state.tasks
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasksTC(props.todoList.id));
  }, []);

  const taskIsDoneChecker = (t: TaskStatuses) => {
    if (t > 0) {
      return true;
    } else return false;
  };

  let tasksForRender = tasksState.tasks[props.todoList.id];

  if (props.todoList.filter === "notDone") {
    tasksForRender = tasksState.tasks[props.todoList.id]?.filter(
      (t) => taskIsDoneChecker(t.status) === false
    );
  }
  if (props.todoList.filter === "done") {
    tasksForRender = tasksState.tasks[props.todoList.id]?.filter(
      (t) => taskIsDoneChecker(t.status) === true
    );
  }

  const [addTaskInputValue, setAddTaskInputValue] = useState("");
  const [addItemError, setAddItemError] = useState<boolean>(false);

  const addTaskHandler = () => {
    if (addTaskInputValue === "" || addTaskInputValue === undefined) {
      setAddItemError(true);
    } else if (addTaskInputValue.length > 0) {
      dispatch(addTaskTC(props.todoList.id, addTaskInputValue));
      setAddTaskInputValue("");
    }
  };

  const addTaskInputSetter = (value: string) => {
    setAddTaskInputValue(value);
    setAddItemError(false);
  };

  const removeTodoListHandler = () => {
    dispatch(removeTodoTC(props.todoList.id));
  };

  const changeTodoListFilterHandler = useCallback(
    (filterValue: FilterValuesType) => {
      dispatch(
        changeTodoListFilter({
          todoListId: props.todoList.id,
          newFilterValue: filterValue,
        })
      );
    },
    [props.todoList.id, dispatch]
  );


  return (
    <div
      className={s.todoListWrapper}
      draggable={props.draggable}
      onDragStart={e => props.dragStartHandler(e, props.todoList)}
      onDragLeave={e => props.dragLeaveHandler(e)}
      onDragEnd={e => props.dragEndHandler(e)}
      onDragOver={e => props.dragOverHandler(e)}
      onDrop={e => props.dropHandler(e, props.todoList)}
    >
      <div className={s.todoListHeader}>
        <UilArrowRight />
        <h3>
          <EditableSpan
            elementId={props.todoList.id}
            elementTitle={props.todoList.id}
            todoListId={props.todoList.id}
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
        keyPressAllow
      />
      {addItemError ? (
        <div className={s.errorMessage}>Title is hard required</div>
      ) : undefined}
      {tasksState.isFetching ? (
        <Preloader />
      ) : (
        <div className={s.todoListTasksWrapper}>
          {tasksForRender?.map((task) => {
            return (
              <Task
                key={task.id}
                todoListId={props.todoList.id}
                taskId={task.id}
                taskTitle={task.title}
                taskStatus={task.status}
              />
            );
          })}
        </div>
      )}
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
  
}
