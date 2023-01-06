import Profile from "./Profile";
import React from "react";
import {connect} from "react-redux";
import {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto, saveProfile, ThunkType,
} from "../../redux/profile-reducer";
import {withAuthRedirectComponent} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {withRouter} from "../../hoc/withRouter";
import {AppStateType} from "../../redux/redux-store";
import { RouteMatch } from "react-router-dom";
import {ProfileType} from "../../Types/Types";

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getUserProfile: (userId: number)=>void
    getStatus: (userId: number)=> void
    updateStatus: (status: string)=> void
    savePhoto: (photoFile: File)=> void
    saveProfile:  (profile: ProfileType)=>  Promise<ThunkType>
}

type PathParamsType = {
    userId: number
    router: RouteMatch
}


type PropsType = MapPropsType & MapDispatchPropsType & PathParamsType;

class ProfileContainer extends React.Component <PropsType > {
   refreshProfile() {
      let userId: number | null  = Number(this.props.router.params.userId);
      if (!userId) {
         userId = this.props.authorizedUserId;
      }
      this.props.getUserProfile(userId!);
      this.props.getStatus(userId!);
   }

   componentDidMount() {
      this.refreshProfile();
   }

   componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
      if (prevProps.router.params.userId != this.props.router.params.userId) {
         this.refreshProfile();
      }
   }

   render() {
      return (
       <Profile
        {...this.props}
        profile={this.props.profile!}
        status={this.props.status!}
        updateStatus={this.props.updateStatus}
        isOwner={!this.props.router.params.userId}
        savePhoto={this.props.savePhoto}
        saveProfile={this.props.saveProfile}
       />
      );
   }
}


let mapStateToProps = (state: AppStateType) => ({
   profile: state.profilePage.currentProfile,
   status: state.profilePage.status,
   authorizedUserId: state.auth.userId,
   isAuth: state.auth.isAuth,
});

export default compose<React.ComponentType>(
 connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile
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
