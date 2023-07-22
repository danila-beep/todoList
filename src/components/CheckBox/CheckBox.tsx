import React, { FC, PropsWithChildren } from "react";
import s from "./checkBox.module.css";
import { v1 } from "uuid";

type CheckBoxProps = {
  isChecked: boolean;
};

const CheckBox: FC<
  PropsWithChildren<CheckBoxProps & React.InputHTMLAttributes<HTMLInputElement>>
> = React.memo((props) => {
  const { isChecked, ...rest } = props;

  const checkBoxTitleRender = () => {
    if (isChecked) {
      return "Done";
    } else {
      return "Not Done";
    }
  };

  const checkBoxId = v1();
  return (
    <div className={s.checkBoxWrapper}>
      <input type="checkbox" id={checkBoxId} checked={isChecked} {...rest} />
      <label htmlFor={checkBoxId}>{checkBoxTitleRender()}</label>
    </div>
  );
});

export default CheckBox;
