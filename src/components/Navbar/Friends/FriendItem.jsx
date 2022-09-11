import s from "./FriendItem.module.css";
const FriendItem = (props) => {
  return (
    <div className={s.item}>
      <div>{props.name}</div>
      <div>
        <img src={props.ava} />
      </div>
    </div>
  );
};

export default FriendItem;
