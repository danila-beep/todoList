import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootStateType } from "store/store"

const slice = createSlice({
    name: "app",
    initialState: {
        appStatus: "idle" as AppStatusesType,
        appError: null as null | string,
        isAppInitialized: false,
    },
    reducers: {
        setAppError: (state, action: PayloadAction<{ appError: string }>) => {
            state.appError = action.payload.appError
        },
        setAppStatus: (state, action: PayloadAction<{ appStatus: AppStatusesType }>) => {
            state.appStatus = action.payload.appStatus
        },
        setAppInitialized: (state, action: PayloadAction<{ isAppInitialized: boolean }>) => {
            state.isAppInitialized = action.payload.isAppInitialized
        },
    },
})


export const appReducer = slice.reducer
export const appActions = slice.actions

type AppStatusesType = "loading" | "idle" | "error"

//selectors
export const selectAppError = (state: RootStateType) => state.app.appError
export const selectAppStatus = (state: RootStateType) => state.app.appStatus
export const selectIsAppInitialized = (state: RootStateType) => state.app.isAppInitialized