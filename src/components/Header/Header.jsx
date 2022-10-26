import axios from "axios";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import React from "react";
import { setUserAva } from "../../redux/auth-reducer";
import LoginAva from "./LoginAva";
import { connect } from "react-redux";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/profile/${this.props.userIdd}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        let ava = response.data.photos.small;

        this.props.setUserAva(ava);
      });
  }

  render() {
    return (
      <header className={s.header}>
        <img src="https://roundpeg.biz/wp-content/uploads/2013/12/Nike.png" />
        <div className={s.loginBlock}>
          {this.props.isAuth ? (
            this.props.login
          ) : (
            <NavLink to={"/login"}>Login</NavLink>
          )}
          <LoginAva avatar={this.props.avatar} />
        </div>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  avatar: state.auth.avatar,
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  userId: state.auth.userId,
});

export default connect(mapStateToProps, { setUserAva })(Header);
