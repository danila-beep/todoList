import React from "react";
import s from "./preloader.module.css";

const Preloader = () => {
  return (
    <div className={s.ldsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Preloader;
