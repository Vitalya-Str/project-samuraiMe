import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {delLogin, setAuth} from "../../Redux/Auth-reducer";
import {compose} from "redux";
import { AppStateType } from "../../Redux/store";

type PropsType = {
   isAuth: boolean
   delLogin: () => void
   login: string
}

class HeaderContainer extends React.Component<PropsType> {

   render() {
      return <Header {...this.props} isAuth={this.props.isAuth} delLogin={this.props.delLogin}/>
   }

}

const mapStateToProps = (state:AppStateType) => ({
   isAuth: state.auth.isAuth,
   login: state.auth.login
})
export default compose(
   connect(mapStateToProps, {setAuth, delLogin,}),
   ) (HeaderContainer)