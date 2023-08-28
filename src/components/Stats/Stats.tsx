import React, { FC, memo } from "react"
import s from "./stats.module.css"
import DashboardCard from "components/DashboardCard/DashboardCard"

type StatsPropsType = {
    countOfTodoLists: number
}

const Stats: FC<StatsPropsType> = memo((props) => {
    return (
        <div className={s.statsList}>
            <DashboardCard progress={props.countOfTodoLists} title={"Count of TodoLists"} />
            <DashboardCard progress={30} title={"Count of TodoLists"} />
            <DashboardCard progress={50} title={"Count of TodoLists"} />
            <DashboardCard progress={90} title={"Count of TodoLists"} />
        </div>
    )
})

export default Stats
