import React, { FC, useEffect, useState } from "react";
import s from "./snackBar.module.css";
import ReactDOM, { createPortal } from "react-dom";
import {
  UilExclamation,
  UilExclamationOctagon,
} from "@iconscout/react-unicons";

type SnackBarPropsType = {
  message: string;
  timeout?: number;
};

const SnackBar: FC<SnackBarPropsType> = ({ message, timeout }): any => {
  const [showSnackBar, setShowSnackBar] = useState<boolean>(true);

  useEffect(() => {
    const timeOutProps = () => {
      if (timeout) {
        return timeout;
      } else {
        return 4000;
      }
    };
    const timeOut = setTimeout(() => setShowSnackBar(false), timeOutProps());
    return () => clearTimeout(timeOut);
  }, [timeout]);

  return (
    showSnackBar && (
      <div className={s.snackBarWrapper}>
        <div className={s.snackBarLogo}>
          <UilExclamationOctagon color="white" />
        </div>
        {message}
      </div>
    )
  );
};

export default SnackBar;
