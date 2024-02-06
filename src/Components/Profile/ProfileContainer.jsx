import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, setProfile, setStatusProfile, updateStatus} from "../../Redux/Profile-reducer";
import {useLocation, useNavigate, useParams} from "react-router-dom"
import {compose} from "redux";

class ProfileContainer extends React.Component {

   componentDidMount() {
      let userId = this.props.router.params.userId
      if (!userId) {
         userId = this.props.authorizedUserid
      }
      this.props.setProfile(userId)
      this.props.getStatus(userId)
   }

   render() {
      return <Profile {...this.props} profile={this.props.profile} profileStatus={this.props.profileStatus}
                      updateStatus={this.props.updateStatus}/>
   }
}

const mapStateToProps = (state) => ({
   profile: state.profilePage.profile,
   profileStatus: state.profilePage.status,
   authorizedUserid: state.auth.id
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

export default compose(connect(mapStateToProps, {setProfile, getStatus, updateStatus, setStatusProfile}),
   withRouter,
)(ProfileContainer)