import React from "react";
import Paginator from "./Paginator";
import User from "./User";
import {UserType} from "../../Types/Types";

type PropsType = {
    currentPage: number
    onPageChanged: (page: number) => void
    totalUsersCount: number
    pageSize: number
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow:(userId:number)=>void
    follow: (userId:number)=>void
}
const Users: React.FC<PropsType> = (props) => {
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
