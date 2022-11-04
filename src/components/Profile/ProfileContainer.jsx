import Profile from "./Profile";
import React from "react";
import { connect } from "react-redux";
import { getUserProfile } from "../../redux/profile-reducer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { withAuthRedirectComponent } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = 2;
    }
    this.props.getUserProfile(userId);
  }

  render() {
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.currentProfile,
});

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

export default compose(
  connect(mapStateToProps, { getUserProfile }),
  withRouter,
  withAuthRedirectComponent
)(ProfileContainer);
//компос работает в следующем порядке:
// let AuthRedirectComponent = withAuthRedirectComponent(ProfileContainer); // передаем в хок  профайл контейнер, чтобы добавить "авторизацию"
// let ProfileContainerWithRouter = withRouter(AuthRedirectComponent);
// connect(mapStateToProps, { getUserProfile })(
//   ProfileContainerWithRouter
// );
