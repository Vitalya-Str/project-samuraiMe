import './App.css';
import Sidebar from "./Components/Sidebar/Sidebar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";

function App() {
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
               </Routes>
            </div>
         </div>
      </BrowserRouter>
   );
}

export default App;
