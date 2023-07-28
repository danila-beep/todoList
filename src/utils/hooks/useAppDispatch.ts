import { AnyAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootStateType } from "../../store/store";

export type AppDispatchType = ThunkDispatch<RootStateType, unknown, AnyAction>
export const useAppDispatch = useDispatch<AppDispatchType>