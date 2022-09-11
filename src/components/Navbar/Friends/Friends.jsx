import FriendItem from "./FriendItem";
import s from "./Friends.module.css";

const Friends = (props) => {
  let friendsItem = props.friends.map((el) => {
    return <FriendItem name={el.name} ava={el.ava} />;
  });
  return (
    <div className={s.wrapp}>
      <div className={s.text}>Best friends</div>
      <div className={s.item}>{friendsItem}</div>
    </div>
  );
};

export default Friends;
