import React, { useEffect } from "react"
import s from "./dashboard.module.css"
import { useAppDispatch, useAppSelector } from "store/store"
import { selectIsLoggedIn } from "store/slices/auth.slice"
import { useNavigate } from "react-router-dom"
import { AvatarGenerator } from "random-avatar-generator"
import Toggler from "components/Toggler/Toggler"
import { colorPaletteActions, darkColorTheme, lightColorTheme } from "store/slices/colorPalette.slice"

const DashBoardPage = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const { userId, userEmail, userName } = useAppSelector((state) => state.user)
    const currentAppTheme = useAppSelector(state => state.theme)
    const avatarGenerator = new AvatarGenerator()


    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        }
    }, [isLoggedIn])

    const themeSwitcher = () => {
        if (currentAppTheme === darkColorTheme) {
            dispatch(colorPaletteActions.setLightTheme())
        }
        if (currentAppTheme === lightColorTheme) {
            dispatch(colorPaletteActions.setDarkTheme())
        }
    }

    return (
        <div className={s.dashboardPageWrapper}>
            <h1>Profile</h1>
            <div className={s.profileInfo}>
                <img src={avatarGenerator.generateRandomAvatar()} alt="" width={150} height={150} />
                <div>
                    <p>
                        {userName} : <span>{userId}</span>
                    </p>
                    <p>{userEmail}</p>
                </div>
            </div>
            <h1>Instruments</h1>
            <ul className={s.instruments}>
                <li>
                    <div className={s.instrumentTitle}>Delete all TodoLists</div>
                    <div className={s.instumentsBtns}>
                        <button>Delete</button>
                    </div>
                </li>
                <li>
                    <div className={s.instrumentTitle}>Delete all Tasks</div>
                    <div className={s.instumentsBtns}>
                        <button>Delete</button>
                    </div>
                </li>
                <li>
                    <div className={s.instrumentTitle}>Mark all Tasks</div>
                    <div className={s.instumentsBtns}>
                        <button>As "Done"</button>
                        <button>As "Not Done"</button>
                    </div>
                </li>
            </ul>
            <h1>Settings</h1>
            <ul className={s.settings}>
                <li>
                    <div className={s.settingTitle}>Switch Theme</div>
                    <div><Toggler onClick={themeSwitcher} checked={currentAppTheme === darkColorTheme ? false : true}/></div>
                </li>
            </ul>
        </div>
    )
}

export default DashBoardPage
