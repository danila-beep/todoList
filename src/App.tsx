import React, { useEffect, useState } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { RootStateType } from "./store/store";
import { TodoListsState } from "./constants/types";
import { addTodoTC } from "./store/slices/todoLists.slice";
import SideBar from "./components/SideBar/SideBar";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import TodoList from "./components/TodoList/TodoList";
import { useAppDispatch } from "./utils/hooks/useAppDispatch";
import Preloader from "./components/Preloader/Preloader";
import LoginModal from "./components/LoginModal/LoginModal";
import { meTC } from "./store/slices/auth.slice";
import { Navigate, Route, Router, Routes, useNavigate } from "react-router-dom";
import TodoListPage from "./pages/TodoListPage";

function App() {
  const isLoggedIn = useSelector(
    (state: RootStateType) => state.auth.isLoggedIn
  );
  const dispatch = useAppDispatch();

console.log(isLoggedIn)

  useEffect(() => {
    dispatch(meTC());
  }, [dispatch]);

  return (
    <div className="App">
      <SideBar />
      <div className="MainContentWrapper">
        <Routes>
          <Route path={"/"} element={<TodoListPage />} />
          <Route path={"/login"} element={<LoginModal />} />
          ​<Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
          ​<Route path="*" element={<Navigate to={"/404"} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
