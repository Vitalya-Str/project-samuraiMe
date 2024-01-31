import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {setAuth} from "../../Redux/Auth-reducer";
import {authAPI} from "../../api/api";

class HeaderContainer extends React.Component {
   componentDidMount() {
      this.props.setAuth()
   }

   render() {
      return <Header {...this.props}/>
   }

}

const mapStateToProps = (state) => ({
   isAuth: state.auth.isAuth,
   login: state.auth.login
})
export default connect(mapStateToProps, {setAuth})(HeaderContainer)