import React, { FC, PropsWithChildren } from "react";
import s from "./radioButton.module.css"
import { v1 } from "uuid";

type RadioProps = {}

const RadioButton: FC<
  PropsWithChildren<RadioProps & React.InputHTMLAttributes<HTMLInputElement>>
> = (props) => {
  const {children, ...rest} = props
  const id = v1();
  return (
    <div className={s.radioWrapper}>
      <input type="radio" id={id} {...rest}/>
      <label htmlFor={id}>{children}</label>
    </div>
  );
};

export default RadioButton;
