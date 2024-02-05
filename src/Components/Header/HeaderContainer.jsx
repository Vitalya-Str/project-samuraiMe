import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {delLogin, setAuth} from "../../Redux/Auth-reducer";

class HeaderContainer extends React.Component {
   componentDidMount() {
      this.props.setAuth()
   }

   render() {
      return <Header {...this.props} delLogin={this.props.delLogin}/>
   }

}

const mapStateToProps = (state) => ({
   isAuth: state.auth.isAuth,
   login: state.auth.login
})
export default connect(mapStateToProps, {setAuth, delLogin})(HeaderContainer)