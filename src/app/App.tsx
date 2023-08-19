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
import { selectAppError, selectAppStatus } from "store/slices/app.slice"

function App() {
    const dispatch = useAppDispatch()
    const appError = useAppSelector(selectAppError)
    const appStatus = useAppSelector(selectAppStatus)

    console.log(typeof appError)

    useEffect(() => {
        dispatch(meTC())
    }, [dispatch])

    const snackBarRender = () => {
        if (!appError) {
            console.log(appError)
        } else if (typeof appError === "string") {
            return <SnackBar message={appError} />
        }
    }

    return (
        <div className="App">
            <SideBar />
            {appStatus === "loading" && <LinearPreloader />}

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
    )
}

export default App
