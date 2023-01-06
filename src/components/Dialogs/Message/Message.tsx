import s from "./../Dialogs.module.css";



const Message: React.FC<{message:string}> = (props) => {
  return <div className={s.message}>{props.message}</div>;
};

export default Message;
