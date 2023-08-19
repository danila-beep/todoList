import { Dispatch } from "@reduxjs/toolkit"
import { GetTasksResponseType, ResponseType } from "api/todoistAPI"
import { appActions } from "store/slices/app.slice"

export const handleNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(appActions.setAppError({ appError: error.message }))
}

export const handleServerError = <D>(
    data: ResponseType | GetTasksResponseType,
    dispatch: Dispatch,
) => {
    if ((data as ResponseType).messages.length) {
        dispatch(appActions.setAppError({ appError: (data as ResponseType).messages[0] }))
        appActions.setAppStatus({ appStatus: "error" })
    } else if ((data as GetTasksResponseType).error) {
        dispatch(appActions.setAppError({ appError: (data as GetTasksResponseType).error }))
        appActions.setAppStatus({ appStatus: "error" })
    } else {
        dispatch(appActions.setAppError({ appError: "Some unexpected error occured" }))
        appActions.setAppStatus({ appStatus: "error" })
    }
}
