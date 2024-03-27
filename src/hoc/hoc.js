import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToPropsRedirect = (state) => {
   return {
      isAuth: state.auth.isAuth
   }
}
export const withAuthRedirect = (Component) => {
   function RedirectComponent(props) {
      if (!props.isAuth) return <Navigate to='/Login'/>

      return <Component {...props}/>
   }

   return connect(mapStateToPropsRedirect)(RedirectComponent)
}

