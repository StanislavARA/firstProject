
import s from "./Post.module.css";

type PropsType = {
    avatar: string | undefined
    message: string
    likes: number
}

const Post = (props:PropsType ) => {
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
