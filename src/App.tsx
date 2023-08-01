import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatchType, RootStateType } from "./store/store";
import { TodoListType, TodoListsState } from "./constants/types";
import {
  addTodoList,
  addTodoTC,
  getTodoTC,
} from "./store/slices/todoLists.slice";
import SideBar from "./components/SideBar/SideBar";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import TodoList from "./components/TodoList/TodoList";
import { useAppDispatch } from "./utils/hooks/useAppDispatch";
import Preloader from "./components/Preloader/Preloader";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const todoListsState = useSelector<RootStateType, TodoListsState>(
    (state) => state.todoLists
  );
  const dispatch = useAppDispatch();

  const [addTodoListInputValue, setAddTodoListInputValue] = useState("");
  const [addItemError, setAddItemError] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getTodoTC());
  }, []);

  const addTodoListHandler = () => {
    if (addTodoListInputValue === "" || addTodoListInputValue === undefined) {
      setAddItemError(true);
    } else if (addTodoListInputValue.length > 0) {
      dispatch(addTodoTC(addTodoListInputValue));
      setAddTodoListInputValue("");
    }
  };

  const addTodoInputSetter = (value: string) => {
    setAddTodoListInputValue(value);
    setAddItemError(false);
  };



  return (
    <div className="App">
      <SideBar />
      <div className="MainContentWrapper">
        <AddItemForm
          addingElement={"TodoList"}
          onClick={addTodoListHandler}
          value={addTodoListInputValue}
          onChange={addTodoInputSetter}
          keyPressAllow
        />
        {addItemError ? (
          <div className="errorMessage">Title is hard required</div>
        ) : undefined}
        {todoListsState.isFetching ? (
          <Preloader />
        ) : (
          <div className="todoListsList">
            {todoListsState.todoLists.map((todoList) => {
              return <TodoList todoList={todoList} key={todoList.id} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
