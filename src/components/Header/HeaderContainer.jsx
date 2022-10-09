import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { setUserData, setUserAva } from "../../redux/auth-reducer";
import Header from "./Header";

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userId: null, avatar: null };
  }
  componentDidMount() {
    axios
      .get("https://social-network.samuraijs.com/api/1.0/auth/me", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.resultCode === 0) {
          let { id, email, login } = response.data.data;
          this.setState({ userId: id });
          this.props.setUserData(id, email, login);
        }
      });
  }

  render() {
    return <Header {...this.props} ss={this.state} />;
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  userId: state.auth.userId,
});

export default connect(mapStateToProps, { setUserData, setUserAva })(
  HeaderContainer
);
