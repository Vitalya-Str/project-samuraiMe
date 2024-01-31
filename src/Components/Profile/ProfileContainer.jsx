import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {setProfile} from "../../Redux/Profile-reducer";
import {useLocation, useNavigate, useParams} from "react-router-dom"
import {withAuthRedirect} from "../../hoc/hoc";
import {compose} from "redux";

class ProfileContainer extends React.Component {

   componentDidMount() {
      let userId = this.props.router.params.userId
      if (!userId) {
         userId = 2
      }

      this.props.setProfile(userId)
   }

   render() {
      return <Profile {...this.props} profile={this.props.profile}/>
   }
}

const mapStateToProps = (state) => ({
   profile: state.profilePage.profile
})

function withRouter(Component) {
   function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
         <Component
            {...props}
            router={{location, navigate, params}}
         />
      );
   }

   return ComponentWithRouterProp;
}

export default compose(connect(mapStateToProps, {setProfile}),
   withRouter,
   withAuthRedirect
)(ProfileContainer)