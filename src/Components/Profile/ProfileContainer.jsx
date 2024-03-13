import React, {useEffect} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {setStatus, setProfile, updateStatus, savePhoto} from "../../Redux/Profile-reducer";
import setStatusProfile from "../../Redux/Profile-reducer";
import {useLocation, useNavigate, useParams} from "react-router-dom"
import {compose} from "redux";

class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.router.params.userId
        if (!userId) {
            userId = this.props.authorizedUserid

        }
        this.props.setProfile(userId)
        this.props.setStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.router.params.userId !== prevProps.router.params.userId) {
            this.refreshProfile()
        }
    }


    render() {
        return <Profile {...this.props}
                        profile={this.props.profile}
                        profileStatus={this.props.profileStatus}
                        updateStatus={this.props.updateStatus}
                        isOwner={!this.props.router.params.userId}
                        savePhoto={this.props.savePhoto}
        />
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    profileStatus: state.profilePage.status,
    authorizedUserid: state.auth.id,
    isAuth: state.auth.isAuth,
})

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        useEffect(() => {
            if (!props.isAuth) {
                navigate("/Login");
            }
        }, [props.isAuth, navigate]);
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    return ComponentWithRouterProp;
}

export default compose(
    connect(mapStateToProps, {savePhoto,setProfile, setStatus, updateStatus, setStatusProfile}),
    withRouter,
)(ProfileContainer)