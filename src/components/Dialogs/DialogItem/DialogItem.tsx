import { NavLink } from "react-router-dom";
import s from "./../Dialogs.module.css";
import React from "react";

function selectLinks() {
  function select(sel: any):string {
    if (sel.isActive) return s.active;
    return s.dialog;
  }
  return select;
}

const DialogItem: React.FC<{id:string, name: string}> = (props) => {
  return (
    <div>
      <NavLink to={props.id} className={selectLinks as unknown as string}>
        {props.name}
      </NavLink>
    </div>
  );
};

export default DialogItem;
