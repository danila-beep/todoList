import React, { FC } from "react"
import s from "./toggler.module.css"

type TogglerPropsType = {
    onClick?: () => void
    checked?: boolean
}

const Toggler: FC<TogglerPropsType> = (props) => {
    return (
        <div className={s.toggleSwitch}>
            <label className={s.switchLabel}>
                <input type="checkbox" className={s.checkbox} checked={props.checked} onChange={props.onClick}/>
                <span className={s.slider}></span>
            </label>
        </div>
    )
}

export default Toggler
