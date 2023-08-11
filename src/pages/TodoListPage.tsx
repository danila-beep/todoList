import React, { useEffect, useState } from "react";
import AddItemForm from "../components/AddItemForm/AddItemForm";
import Preloader from "../components/Preloader/Preloader";
import TodoList from "../components/TodoList/TodoList";
import { addTodoTC, getTodoTC } from "../store/slices/todoLists.slice";
import { useAppDispatch } from "../utils/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { TodoListsState } from "../constants/types";
import { RootStateType } from "../store/store";
import { Navigate, useNavigate } from "react-router-dom";

const TodoListPage = () => {
  const todoListsState = useSelector<RootStateType, TodoListsState>(
    (state) => state.todoLists
  );
  const isLoggedIn = useSelector(
    (state: RootStateType) => state.auth.isLoggedIn
  );
console.log(isLoggedIn)

  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
        console.log('gettodolist')
       dispatch(getTodoTC());
    } else {
        navigate("/login")
    }
  }, [dispatch, isLoggedIn, navigate])

  const [addTodoListInputValue, setAddTodoListInputValue] = useState("");
  const [addItemError, setAddItemError] = useState<boolean>(false);
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

//   if (!isLoggedIn) {
//     return <Navigate to={"/login"} />;
//   }

  return (
    <div>
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
          {todoListsState.todoLists.map((todoList, index) => {
            return <TodoList todoList={todoList} key={todoList.id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default TodoListPage;
