import React, { FC } from "react"
import s from "./dashboardCard.module.css"
import styled from "styled-components"

type DashboardCardTypes = {
    progress: number,
    title: string
}

const DashboardCard: FC<DashboardCardTypes> = (props) => {
    return (
        <div className={s.dashboardItem}>
            <div>
                <h3>{props.title}</h3>
                <p className={s.stats}>10</p>
            </div>
            <ProgressBar value={props.progress} />
        </div>
    )
}

export const ProgressBar = styled.div<{value: number}>`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: radial-gradient(closest-side, var(--second-bg-color) 79%, transparent 80% 100%),
        conic-gradient(rgb(73, 73, 198) ${props => props.value}%, var(--text-color) 0);
`

export default DashboardCard
