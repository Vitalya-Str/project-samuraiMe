import './App.css';
import Sidebar from "./Components/Sidebar/Sidebar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login";
import {connect} from "react-redux";
import {setInizialiaedSucces} from "./Redux/App-reducer";
import React from "react";
import Preloader from "./Common/Preloader/Preloader";

class App extends React.Component {
   componentDidMount() {
      this.props.setInizialiaedSucces()
   }

   render() {
      if (!this.props.inizialiaed) {
         return <Preloader/>
      }

      return (
         <BrowserRouter>
            <div className="App">
               <HeaderContainer/>
               <Sidebar/>
               <div className="App-content">
                  <Routes>
                     <Route path="/profile/:userId?" element={<ProfileContainer/>}/>
                     <Route path="/messages" element={<DialogsContainer/>}/>
                     <Route path="/users" element={<UsersContainer/>}/>
                     <Route path="/login" element={<Login/>}/>
                  </Routes>
               </div>
            </div>
         </BrowserRouter>
      );
   }
}

const mapStateToProps = (state) => ({
   inizialiaed: state.app.inizialiaed
})


export default connect(mapStateToProps, {setInizialiaedSucces})(App);
