import s from "./../Dialogs.module.css";

function selectLinks() {
  function select(sel) {
    if (sel.isActive) return s.active;
    return s.dialog;
  }
  return select;
}

const Message = (props) => {
  return <div className={s.message}>{props.message}</div>;
};

export default Message;
