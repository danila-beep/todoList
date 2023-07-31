import React, { FC } from "react";
import s from "./addItemForm.module.css";
import { UilLinkAdd, UilPlus } from "@iconscout/react-unicons";
import { motion } from "framer-motion";

type AddItemFormProps = {
  addingElement?: string;
  onClick?: () => void;
  value?: string;
  onChange: (value: string) => void;
  centered?: boolean;
  keyPressAllow?: boolean;
};

const AddItemForm: FC<AddItemFormProps> = React.memo((props) => {
  const onKeyDownHandler = () => {
    if (props.keyPressAllow && props.onClick) {
      props.onClick()
      props.onChange("")
    }
    else {
      return undefined
    }
  };

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
          onKeyDown={(e) =>
            e.key === "Enter" ? onKeyDownHandler() : undefined
          }
        />
      </div>
      <motion.button onClick={props.onClick} whileHover={{scale: 1.2}} whileTap={{scale: 0.8}}>
        <UilPlus />
      </motion.button>
    </div>
  );
});

export default AddItemForm;
