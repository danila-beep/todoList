import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatchType, RootStateType } from "./store/store";
import { TodoListType } from "./constants/types";
import { addTodoList, addTodoTC, getTodoTC } from "./store/slices/todoLists.slice";
import SideBar from "./components/SideBar/SideBar";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import TodoList from "./components/TodoList/TodoList";
import { useAppDispatch } from "./utils/hooks/useAppDispatch";

function App() {
  const todoLists = useSelector<RootStateType, Array<TodoListType>>(
    (state) => state.todoLists
  );
  const dispatch = useAppDispatch();

  const [addTodoListInputValue, setAddTodoListInputValue] = useState("");

  useEffect(() => {
    dispatch(getTodoTC())
  }, [])

  const addTodoListHandler = () => {
    dispatch(
      addTodoTC(addTodoListInputValue)
    );
  };

  const addTodoInputSetter = (value: string) => {
    setAddTodoListInputValue(value);
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
        />
        <div className="todoListsList">
          {todoLists.map((todoList) => {
            return (
              <TodoList
                key={todoList.id}
                todoListId={todoList.id}
                todoListTitle={todoList.title}
                todoListFilter={todoList.filter}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
