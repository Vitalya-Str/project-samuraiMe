import './App.css';
import Sidebar from "./Components/Sidebar/Sidebar";
import {Route, Routes} from "react-router-dom";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login";
import {connect} from "react-redux";
import {setInizialiaedSucces} from "./Redux/App-reducer";
import React, {lazy, Suspense} from "react";
import Preloader from "./Common/Preloader/Preloader";

function delayForDemo(promise) {
    return new Promise(resolve => {
        setTimeout(resolve, 1000);
    }).then(() => promise)}

const DialogsContainer = lazy(() => delayForDemo( import("./Components/Dialogs/DialogsContainer")));
const UsersContainer = lazy(() => delayForDemo (import("./Components/Users/UsersContainer")));

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
                        <Route path="/messages" element={<Suspense fallback={<Preloader/>}>
                            {<DialogsContainer/>}
                        </Suspense>}/>
                        <Route path="/users" element={<Suspense fallback={<Preloader/>}>
                            {<UsersContainer/>}
                        </Suspense>}/>
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


export default connect(mapStateToProps, {setInizialiaedSucces})(App);
