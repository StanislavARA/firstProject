import axios from "axios";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import React from "react";
import { actionsAuth, logout } from "../../redux/auth-reducer";
import { connect } from "react-redux";
// @ts-ignore
import userLogo from "../../assets/img/149071.png";
import {AppStateType} from "../../redux/redux-store";



class Header extends React.Component <MapPropsType & MapDispatchPropsType> {

  componentDidMount() {
    // axios
    //   .get(
    //     `https://social-network.samuraijs.com/api/1.0/profile/${this.props.userIdd}`,
    //     {
    //       withCredentials: true,
    //     }
    //   )
    //   .then((response) => {
    //     let ava = response.data.photos.small;
    //     this.props.setUserAva(ava);
    //   });
  }

  render() {
    return (
      <header className={s.header}>
        <img src="https://roundpeg.biz/wp-content/uploads/2013/12/Nike.png" />
        <div className={s.loginBlock}>
          {this.props.isAuth ? (
            <div>
              {" "}
              {this.props.login} -{" "}
              <button onClick={this.props.logout}> Logout</button>{" "}
            </div>
          ) : (
            <NavLink to={"/login"}>Login</NavLink>
          )}
          <div>
            <img src={this.props.avatar ? this.props.avatar : userLogo} />
          </div>
        </div>
      </header>
    );
  }
}
const mapStateToProps = (state: AppStateType) => ({
  avatar: state.auth.avatar,
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  userId: state.auth.userId,
});

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
  logout: ()=>void
  setUserAva: (avatar:string)=>void
}

export default connect <MapPropsType, MapDispatchPropsType, {},  AppStateType>(mapStateToProps, { setUserAva: actionsAuth.setUserAva, logout })(Header);
