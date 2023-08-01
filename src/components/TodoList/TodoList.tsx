import React, { FC, useCallback, useEffect, useState } from "react";
import s from "./todoList.module.css";
import { UilArrowRight, UilTrashAlt } from "@iconscout/react-unicons";
import Task from "../Task/Task";
import { RootStateType } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  FilterValuesType,
  TodoListType,
  TodoListsState,
  tasksState,
} from "../../constants/types";
import AddItemForm from "../AddItemForm/AddItemForm";
import { addTask, addTaskTC, getTasksTC, reorderTasks } from "../../store/slices/tasks.slice";
import {
  changeTodoListFilter,
  removeTodoTC,
} from "../../store/slices/todoLists.slice";
import EditableSpan from "../EditableSpan/EditableSpan";
import RadioButton from "../RadioButton/RadioButton";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import { TaskStatuses, TaskType } from "../../api/todoistAPI";
import Preloader from "../Preloader/Preloader";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

type TodoListProps = {
  todoList: TodoListType;
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

  const dragDropHandler = (results: any) => {
    const { source, destination, type } = results;

    console.log(results);

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (type === "group") {
      const reorderedTasksState: TaskType[] = [...tasksForRender];

      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const reorderedSource = reorderedTasksState[sourceIndex]
      reorderedTasksState[sourceIndex] = reorderedTasksState[destinationIndex]
      reorderedTasksState[destinationIndex] = reorderedSource

      dispatch(reorderTasks({
        todoListId: props.todoList.id,
        reorderedTasksState: reorderedTasksState
      }))
    }
  };

  return (
    <DragDropContext onDragEnd={dragDropHandler}>
      <div className={s.todoListWrapper}>
        <div className={s.todoListHeader}>
          <UilArrowRight />
          <h3>
            <EditableSpan
              elementId={props.todoList.id}
              elementTitle={props.todoList.title}
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
          <Droppable droppableId={props.todoList.id} type="group">
            {(provided) => {
              return (
                <div
                  className={s.todoListTasksWrapper}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {tasksForRender?.map((task, index) => {
                    return (
                      <Draggable
                        draggableId={task.id}
                        key={task.id}
                        index={index}
                      >
                        {(provided) => {
                          return (
                            <div
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                            >
                              <Task
                                key={task.id}
                                todoListId={props.todoList.id}
                                taskId={task.id}
                                taskTitle={task.title}
                                taskStatus={task.status}
                              />
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                </div>
              );
            }}
          </Droppable>
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
    </DragDropContext>
  );
});

export default TodoList;
