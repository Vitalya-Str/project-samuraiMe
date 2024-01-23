import './App.css';
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";

function App() {
   return (
      <BrowserRouter>
         <div className="App">
            <Header/>
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
