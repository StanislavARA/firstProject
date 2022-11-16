import React from "react";
import { connect } from "react-redux";
import { setUserAva } from "../../redux/auth-reducer";
import Header from "./Header";

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
    };
    this.newId = this.newId.bind(this);
  }
  newId(usID) {
    this.setState({ id: usID });
  }

  render() {
    return <Header />;
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { setUserAva })(HeaderContainer);
