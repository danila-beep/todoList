import { useEffect } from "react";
import "./App.css";
import SideBar from "./components/SideBar/SideBar";
import { useAppDispatch } from "./utils/hooks/useAppDispatch";
import LoginModal from "./components/LoginModal/LoginModal";
import { meTC } from "./store/slices/auth.slice";
import { Navigate, Route, Routes } from "react-router-dom";
import TodoListPage from "./pages/TodoListPage";
import SnackBar from "./components/SnackBar/SnackBar";
import useAppSelector from "./utils/hooks/useAppSelector";
import Preloader from "./components/Preloader/Preloader";

function App() {
  const dispatch = useAppDispatch();
  const appError = useAppSelector((state): string | null => state.app.appError);
  const isAppInitialized = useAppSelector(
    (state): boolean => state.app.isAppInitialized
  );

  console.log(typeof appError);

  useEffect(() => {
    dispatch(meTC());
  }, [dispatch]);

  const snackBarRender = () => {
    if (!appError) {
      console.log(appError);
    } else if (typeof appError === "string") {
      return <SnackBar message={appError} />;
    }
  };

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
      {snackBarRender()}
    </div>
  );
}

export default App;
