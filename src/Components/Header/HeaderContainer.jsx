import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {delLogin, setAuth} from "../../Redux/Auth-reducer";
import {compose} from "redux";

class HeaderContainer extends React.Component {
   componentDidMount() {
      this.props.setAuth()
   }

   render() {
      return <Header {...this.props} isAuth={this.props.isAuth} delLogin={this.props.delLogin}/>
   }

}

const mapStateToProps = (state) => ({
   isAuth: state.auth.isAuth,
   login: state.auth.login
})
export default compose(
   connect(mapStateToProps, {setAuth, delLogin,}),
   ) (HeaderContainer)