import Post from "./Post/Post";
//@ts-ignore
import s from "./MyPosts.module.css";
import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {
  maxLengthCreator,
  requiredField,
} from "../../../utils/validators/validators";
import { TextArea } from "../../common/FormsControls/FormsControls";
import {InitialStateType} from "../../../redux/profile-reducer";

const maxLength10 = maxLengthCreator(10);

type PropsType ={
    addPost: (value:string)=>void
   }

const MyPosts = (props: InitialStateType & PropsType ) => {
  let postsElements = props.posts.map((p) => {
    return (
      <Post message={p.message} likes={p.likes} avatar={p.avatar} key={p.id} />
    );
  });

  let addPost = (values:AddPostFormValuesType ) => {
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

type AddPostFormValuesType = {
    name: string
    newPostText: string
   }

const AddPostForm: React.FC <InjectedFormProps<AddPostFormValuesType>> = (props) => {
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

const AddPostFormRedux = reduxForm <AddPostFormValuesType>({ form: "ProfileAddNewPostForm" })(
  AddPostForm
);

export default MyPosts;
