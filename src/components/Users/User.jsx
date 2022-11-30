import React from "react";
import s from "./Users.module.css";
import userPhoto from "..//../assets/img/149071.png";
import { NavLink } from "react-router-dom";

const User = ({ user, ...props }) => {
  return (
    <div>
      <span>
        <div>
          <NavLink to={"/profile/" + user.id}>
            <img
              src={user.photos.small != null ? user.photos.small : userPhoto}
              className={s.usersPhoto}
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button
              disabled={props.followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                props.unfollow(user.id);
              }}
            >
              unfollow
            </button>
          ) : (
            <button
              disabled={props.followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                props.follow(user.id);
              }}
            >
              follow
            </button>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
        <span>
          <div>{"u.location.country"}</div>
          <div>{"u.location.city"}</div>
        </span>
      </span>
    </div>
  );
};

export default User;
