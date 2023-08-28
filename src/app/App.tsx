import { useEffect } from "react"
import "./App.css"
import SideBar from "components/SideBar/SideBar"
import LoginModal from "components/LoginModal/LoginModal"
import { meTC } from "store/slices/auth.slice"
import { Navigate, Route, Routes } from "react-router-dom"
import TodoListPage from "pages/TodoListPage"
import SnackBar from "components/SnackBar/SnackBar"
import { useAppDispatch, useAppSelector } from "store/store"
import LinearPreloader from "components/Preloader/LinearPreloader"
import { selectAppError, selectAppStatus, selectIsAppInitialized } from "store/slices/app.slice"
import DashBoardPage from "pages/DashBoardPage"
import Preloader from "components/Preloader/Preloader"
import React from "react"

function App() {
    const dispatch = useAppDispatch()
    const appError = useAppSelector(selectAppError)
    const appStatus = useAppSelector(selectAppStatus)
    const isAppinitialized = useAppSelector(selectIsAppInitialized)


    console.log("rerender");
    

    useEffect(() => {

        dispatch(meTC())
    }, [dispatch])

    const snackBarRender = () => {
        if (!appError) {
        } else if (typeof appError === "string") {
            return <SnackBar message={appError} />
        }
    }

    const appLoading = () => {
        if (!isAppinitialized) {
            return (
                <div className={"AppLoading"}>
                    <Preloader />
                </div>
            )
        } else {
            return (
                <div className="App">
                    <SideBar />
                    {appStatus === "loading" && <LinearPreloader />}

                    <div className="MainContentWrapper">
                        <Routes>
                            <Route path={"/"} element={<TodoListPage />} />
                            <Route path={"/login"} element={<LoginModal />} />
                            <Route path={"/dashboard"} element={<DashBoardPage />} />
                            ​<Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
                            ​<Route path="*" element={<Navigate to={"/404"} />} />
                        </Routes>
                    </div>
                    {snackBarRender()}
                </div>
            )
        }
    }

    return appLoading()
}

export default App
