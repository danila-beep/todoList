import React from "react"
import s from "./linearPreloader.module.css"

const LinearPreloader = () => {
    return (
        <div className={s.linearActivity}>
            <div className={s.indeterminate}></div>
        </div>
    )
}

export default LinearPreloader
