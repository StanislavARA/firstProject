import Post from "./Post/Post";
import s from "./MyPosts.module.css";
import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  maxLengthCreator,
  requiredField,
} from "../../../utils/validators/validators";
import { TextArea } from "../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10);

const MyPosts = (props) => {
  let postsElements = props.posts.map((p) => {
    return (
      <Post message={p.message} likes={p.likes} avatar={p.avatar} key={p.id} />
    );
  });

  let addPost = (values) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={s.postsBlock}>
      <h3>my posts</h3>
      <div>
        <AddPostFormRedux onSubmit={addPost} />
      </div>
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component={TextArea}
        name="newPostText"
        validate={[requiredField, maxLength10]}
      />
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const AddPostFormRedux = reduxForm({ form: "ProfileAddNewPostForm" })(
  AddPostForm
);

export default MyPosts;
