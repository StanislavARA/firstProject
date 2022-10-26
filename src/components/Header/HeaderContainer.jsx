import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { authAPI } from "../../api/api";
import { setUserData } from "../../redux/auth-reducer";
import Header from "./Header";

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
    };
  }
  newId(usID) {
    this.setState({ id: usID });
  }
  componentDidMount() {
    authAPI.getDataLoginUser().then((data) => {
      if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        this.newId(id);
        this.props.setUserData(id, email, login);
      }
    });
  }

  render() {
    return <Header userIdd={this.state.id} />;
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { setUserData })(HeaderContainer);
