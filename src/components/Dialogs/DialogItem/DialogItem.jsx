import { NavLink } from "react-router-dom";
import s from "./../Dialogs.module.css";

function selectLinks() {
  function select(sel) {
    if (sel.isActive) return s.active;
    return s.dialog;
  }
  return select;
}

const DialogItem = (props) => {
  return (
    <div>
      <NavLink to={props.id} className={selectLinks}>
        {props.name}
      </NavLink>
    </div>
  );
};

export default DialogItem;
