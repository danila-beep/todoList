import React from "react"
import s from "./dashboard.module.css"
import { UilDatabase } from "@iconscout/react-unicons"
import styled from "styled-components"
import DashboardCard from "components/DashboardCard/DashboardCard"

const DashBoardPage = () => {
    return (
        <div className={s.dashboardPageWrapper}>
            <h1>Profile</h1>
            <div>
                
            </div>
            <h1>Stats</h1>
            <div className={s.statsList}>
                <DashboardCard progress={10} title={"Count of TodoLists"} />
                <DashboardCard progress={30} title={"Count of TodoLists"} />
                <DashboardCard progress={50} title={"Count of TodoLists"} />
                <DashboardCard progress={90} title={"Count of TodoLists"} />
            </div>
            <h1>Instruments</h1>
            <div>

            </div>
            <h1>Settings</h1>
            <div>

            </div>
        </div>
    )
}

export default DashBoardPage
