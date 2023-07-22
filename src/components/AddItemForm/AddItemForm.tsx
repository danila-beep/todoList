import React, { FC } from "react";
import s from "./addItemForm.module.css";
import { UilLinkAdd, UilPlus } from "@iconscout/react-unicons";

type AddItemFormProps = {
  addingElement?: string;
  onClick?: () => void;
  value?: string;
  onChange: (value: string) => void;
  centered?: boolean;
};

const AddItemForm: FC<AddItemFormProps> = React.memo((props) => {
  return (
    <div
      className={s.addItemFormWrapper}
      style={
        props.centered
          ? { justifyContent: "center" }
          : { justifyContent: "start" }
      }
    >
      <div className={s.addItemFormInput}>
        <input
          type="text"
          placeholder={`Type the name of ${props.addingElement} ...`}
          value={props.value}
          onChange={(e) => props.onChange(e.currentTarget.value)}
        />
      </div>
      <button onClick={props.onClick}>
        <UilPlus />
      </button>
    </div>
  );
});

export default AddItemForm;
