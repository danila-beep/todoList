import React from "react"
import s from "./preloader.module.css"

const Preloader = () => {
    return (
        <div className={`${s.loader2} ${s.center}`}>
            <span></span>
        </div>
    )
}

export default Preloader
