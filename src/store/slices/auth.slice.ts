import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AuthDataType, RESULT_CODES, auth } from "api/todoistAPI"
import { handleNetworkError, handleServerError } from "utils/errorHandlers/appErrorHandlers"
import { appActions } from "./app.slice"
import { RootStateType } from "store/store"
import { userActions } from "./user.slice"

//reducer
const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        login: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        },
        logout: (state) => {
            return { ...state, isLoggedIn: false }
        },
    },
})

export const authReducer = slice.reducer
export const authActions = slice.actions

//thunk
export const loginTC = (data: AuthDataType) => async (dispatch: Dispatch) => {
    auth.login(data)
        .then((res) => {
            if (res.data.resultCode === RESULT_CODES.OK) {
                dispatch(authActions.login({ isLoggedIn: true }))
            } else {
                handleServerError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleNetworkError(error, dispatch)
        })
}
export const meTC = () => async (dispatch: Dispatch) => {
    auth.me().then((res) => {
        if (res.data.resultCode === RESULT_CODES.OK) {
            dispatch(authActions.login({ isLoggedIn: true }))
            dispatch(appActions.setAppInitialized({ isAppInitialized: true }))
            dispatch(
                userActions.setUserInfo({
                    id: res.data.data.id,
                    email: res.data.data.email,
                    login: res.data.data.login,
                }),
            )
        } else {
            dispatch(appActions.setAppInitialized({ isAppInitialized: true }))
        }
    })
}
export const logoutTC = () => async (dispatch: Dispatch) => {
    auth.logout().then((res) => {
        dispatch(authActions.logout())
    })
}

//selectors
export const selectIsLoggedIn = (state: RootStateType) => state.auth.isLoggedIn
