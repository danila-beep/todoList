import React from "react";
import s from "./sidebar.module.css";
import { UilDashboard, UilHome } from "@iconscout/react-unicons";

const SideBar = React.memo(() => {
  return (
    <div className={s.sideBarWrapper}>
      <h1>TodoList</h1>
      <nav className={s.sideBarNavigation}>
        <ul className={s.navigationLinks}>
          <li className={s.navigationItem}>
            <UilHome />
            <div>Home</div>
          </li>
          <li className={s.navigationItem}>
            <UilDashboard />
            <div>Dashboard</div>
          </li>
        </ul>
      </nav>
      <div className={s.loginButton}>
        <button>Login / SignUp</button>
      </div>
    </div>
  );
});

export default SideBar;
