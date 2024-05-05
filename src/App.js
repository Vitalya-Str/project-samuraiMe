import './App.css';
import Sidebar from "./Components/Sidebar/Sidebar";
import {Route, Routes, useLocation, useNavigate, useParams} from "react-router-dom";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login";
import {connect} from "react-redux";
import {setInizialiaedSucces} from "./Redux/App-reducer";
import React, {lazy, Suspense} from "react";
import Preloader from "./Common/Preloader/Preloader";
import {compose} from "redux";
import ChatPage from './Components/Chat/ChatPage';
// import { UsersContainer } from './Components/Users/UsersContainer';

async function delayForDemo(promise) {
    await new Promise(resolve => {
        setTimeout(resolve, 1000);
    });
    return promise;}

const DialogsContainer = lazy(() => delayForDemo( import("./Components/Dialogs/DialogsContainer")));
const UsersContainer = lazy(() => delayForDemo( import("./Components/Users/UsersContainer")));

class App extends React.Component {
    componentDidMount() {
        this.props.setInizialiaedSucces()
    }

    render() {
        if (!this.props.inizialiaed) {
            return <Preloader/>
        }

        return (
            <div className="App">
                <HeaderContainer/>
                <Sidebar/>
                <div className="App-content">
                    <Routes>
                        <Route path="/profile/:userId?" element={<ProfileContainer/>}/>
                        <Route path="/" element={<ProfileContainer/>}/>
                        <Route path="/messages" element={<Suspense fallback={<Preloader/>}>
                            {<DialogsContainer/>}
                        </Suspense>}/>
                        <Route path="/users" element={<Suspense fallback={<Preloader/>}>
                            {<UsersContainer/>}
                        </Suspense>}/>
                        <Route path="/chat" element={<ChatPage/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    inizialiaed: state.app.inizialiaed
})
function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component {...props} router={{ location, navigate, params }} />
        );
    }
    return ComponentWithRouterProp;
}

export default compose (
    withRouter,
    connect(mapStateToProps, {setInizialiaedSucces})
)(App);
