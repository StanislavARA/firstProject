import Profile from "./Profile";
import React from "react";
import { connect } from "react-redux";
import {
  getUserProfile,
  getStatus,
  updateStatus,
  savePhoto,
} from "../../redux/profile-reducer";
import { withAuthRedirectComponent } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { withRouter } from "../../hoc/withRouter";
class ProfileContainer extends React.Component {
  refreshProfile() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
    }

    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.router.params.userId != this.props.router.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile
        {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        isOwner={!this.props.router.params.userId}
        savePhoto={this.props.savePhoto}
      />
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.currentProfile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
  }),
  withRouter
  // withAuthRedirectComponent
)(ProfileContainer);
//компос работает в следующем порядке:
// let AuthRedirectComponent = withAuthRedirectComponent(ProfileContainer); // передаем в хок  профайл контейнер, чтобы добавить "авторизацию"
// let ProfileContainerWithAuthRedirectAndWithRouter = withRouter(AuthRedirectComponent);
// connect(mapStateToProps, { getUserProfile })(
//   ProfileContainerWithAuthRedirectAndWithRouter
// );
