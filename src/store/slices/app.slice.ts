import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: InitialStateType = {
  appStatus: "idle",
  appError: null,
  isAppInitialized: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ appError: string }>) => {
      state.appError = action.payload.appError
    },
    setAppStatus: (
      state,
      action: PayloadAction<{ appStatus: AppStatusesType }>
    ) => {
      state.appStatus = action.payload.appStatus
    },
    setAppInitialized: (
      state,
      action: PayloadAction<{ isAppInitialized: boolean }>
    ) => {
      state.isAppInitialized = action.payload.isAppInitialized
    },
  },
});

type AppStatusesType = "loading" | "idle" | "error";

type InitialStateType = {
  appStatus: AppStatusesType;
  appError: string | null;
  isAppInitialized: boolean;
};

export const { setAppError, setAppStatus, setAppInitialized } =
  appSlice.actions;
export default appSlice.reducer;
