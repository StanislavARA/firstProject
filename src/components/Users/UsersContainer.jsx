import React from "react";
import { connect } from "react-redux";
import {
  follow,
  setCurrentPage,
  unfollow,
  requestUsers,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import { withAuthRedirectComponent } from "../../hoc/withAuthRedirect";
import {
  getPageSize,
  getTotalUsersCount,
  getAllUsers,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress,
} from "../../redux/users-selectors";

class UsersContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { currentPage, pageSize } = this.props;
    this.props.requestUsers(currentPage, pageSize); //создали thunk, чтобы работу с апи перенести из компоненты в BLL
  }

  onPageChanged = (pageNumber) => {
    // this.props.setCurrentPage(pageNumber);
    this.props.requestUsers(pageNumber, this.props.pageSize);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? (
          <Preloader />
        ) : (
          <Users
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            unfollow={this.props.unfollow}
            follow={this.props.follow}
            followingInProgress={this.props.followingInProgress}
          />
        )}
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: getAllUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

let AuthRedirectComponent = withAuthRedirectComponent(UsersContainer);

export default connect(mapStateToProps, {
  //зарефакторил коннект - заменили мапдиспатчтупропс на объект с экшн креэйторами
  follow,
  unfollow,
  setCurrentPage,
  requestUsers,
})(AuthRedirectComponent);

// let mapDispatchToProps = (dispatch) => {
//   return {
//     follow: (userId) => {
//       dispatch(followAC(userId));
//     },
//     unfollow: (userId) => {
//       dispatch(unfollowAC(userId));
//     },
//     setUsers: (users) => {
//       dispatch(setUsersAC(users));
//     },
//     setCurrentPage: (page) => {
//       dispatch(setCurrentPageAC(page));
//     },
//     setTotalUsersCount: (count) => {
//       dispatch(setTotalUsersCountAC(count));
//     },
//     toggleIsFetching: (isFetching) => {
//       dispatch(toggleIsFetchingAC(isFetching));
//     },
//   };
// };
