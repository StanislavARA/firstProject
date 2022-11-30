import React from "react";
import Paginator from "./Paginator";
import User from "./User";

const Users = (props) => {
  return (
    <div>
      <Paginator
        currentPage={props.currentPage}
        onPageChanged={props.onPageChanged}
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
      />
      <div>
        {props.users.map((u) => (
          <div key={u.id}>
            <User
              user={u}
              followingInProgress={props.followingInProgress}
              unfollow={props.unfollow}
              follow={props.follow}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
