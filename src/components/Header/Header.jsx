import axios from "axios";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import React from "react";
import { setUserAva, logout } from "../../redux/auth-reducer";
import { connect } from "react-redux";
import userLogo from "../../assets/img/149071.png";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // console.log(this.props);
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
    console.log(this.props.isAuth);
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
const mapStateToProps = (state) => ({
  avatar: state.auth.avatar,
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  userId: state.auth.userId,
});

export default connect(mapStateToProps, { setUserAva, logout })(Header);
