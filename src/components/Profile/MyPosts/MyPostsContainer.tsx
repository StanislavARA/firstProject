import React from "react";
import {actionsProfile, ThunkType} from "../../../redux/profile-reducer";

import MyPosts from "./MyPosts";
import { connect } from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {ProfileType} from "../../../Types/Types";

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    addPost: (post: string)=>void
    }

const mapStateToProps = (state: AppStateType) => {
    return {
    posts: state.profilePage.posts,
  };
};

const MyPostsContainer = connect<MapPropsType, MapDispatchPropsType, {},  AppStateType>(mapStateToProps, {addPost: actionsProfile.addPostActionCreator })(MyPosts);

export default MyPostsContainer;
