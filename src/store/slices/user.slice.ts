import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState: UserStateType = {}

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInfo: (
            state,
            action: PayloadAction<{ id: number; email: string; login: string }>,
        ) => {

            return {
                ...state,
                userId: action.payload.id,
                userName: action.payload.login,
                userEmail: action.payload.email,
            }
        },
    },
})

export const userReducer = slice.reducer
export const userActions = slice.actions

export type UserStateType = {
    userId?: number
    userName?: string
    userEmail?: string
}
