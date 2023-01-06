import React from "react";
import { connect } from "react-redux";
import { actionsAuth } from "../../redux/auth-reducer";
import Header from "./Header";

class HeaderContainer extends React.Component <MapDispatchPropsType>{
  constructor(props:MapDispatchPropsType) {
    super(props);
    this.state = {
      id: null,
    };
    this.newId = this.newId.bind(this);
  }
  newId(usID:number) {
    this.setState({ id: usID });
  }

  render() {
    return <Header />;
  }
}

const mapStateToProps = () => ({});

type MapDispatchPropsType = {
  setUserAva: (avatar:string)=>void
}

export default connect(mapStateToProps, { setUserAva:actionsAuth.setUserAva} )(HeaderContainer);
