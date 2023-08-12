import { Dispatch } from "@reduxjs/toolkit";
import { setAppError } from "../../store/slices/app.slice";
import { ResponseType } from "../../api/todoistAPI";

export enum ErrorEnums {
  OK = 0,
  ERROR = 1,
  CAPCHAERROR = 10,
}

export const handleNetworkError = (
  error: { message: string },
  dispatch: Dispatch
) => {
  dispatch(setAppError({ appError: error.message }));
};

export const handleServerError = (data: ResponseType, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppError({ appError: data.messages[0] }));
  } else {
    dispatch(setAppError({ appError: "Some unexpected error occured" }));
  }
};
