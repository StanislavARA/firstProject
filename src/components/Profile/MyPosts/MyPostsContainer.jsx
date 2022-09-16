import React from "react";
import {
  addPostActionCreator,
  updateNewPostTextActionCreator,
} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

const MyPostsContainer = (props) => {
  let state = props.store.getState();
  let onAddPost = () => {
    props.store.dispatch(addPostActionCreator());
  };
  let onPostChange = (text) => {
    props.store.dispatch(updateNewPostTextActionCreator(text)); //для отрисовки вызываем дипач из store.dispatch и передаем в него action { type: ACTION_1, value_1: значение } (action был создан экшнкриэйтором)
  };
  return (
    <MyPosts
      updateNewPostText={onPostChange}
      addPost={onAddPost}
      posts={state.profilePage.posts}
      newPostText={state.profilePage.newPostText}
    />
  );
};

export default MyPostsContainer;
