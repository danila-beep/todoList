import React from "react"
import s from "./sidebar.module.css"
import { UilDashboard, UilHome } from "@iconscout/react-unicons"
import { logoutTC } from "../../store/slices/auth.slice"
import { useAppDispatch } from "store/store"
import LinearPreloader from "components/Preloader/LinearPreloader"
import { NavLink } from "react-router-dom"

const SideBar = React.memo(() => {
    const dispatch = useAppDispatch()
    const logoutButtonHandler = () => {
        dispatch(logoutTC())
    }
    return (
        <div className={s.sideBarWrapper}>
            <h1>TodoList</h1>
            <nav className={s.sideBarNavigation}>
                <ul className={s.navigationLinks}>
                    <NavLink to={"/"}>
                        <li className={s.navigationItem}>
                            <UilHome />
                            <div>Home</div>
                        </li>
                    </NavLink>
                    <NavLink to={"/dashboard"}>
                        <li className={s.navigationItem}>
                            <UilDashboard />
                            <div>Dashboard</div>
                        </li>
                    </NavLink>
                </ul>
            </nav>
            <div className={s.loginButton}>
                <button onClick={logoutButtonHandler}>Logout</button>
            </div>
        </div>
    )
})

export default SideBar
