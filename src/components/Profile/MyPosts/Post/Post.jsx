import s from "./Post.module.css";

const Post = (props) => {
  return (
    <div className={s.item}>
      <img src={props.avatar} />
      {props.message}
      <div>
        <span>like {props.likes}</span>
      </div>
    </div>
  );
};

export default Post;
