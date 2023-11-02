import './App.css';
import Profile from "./Components/Profile/Profile";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Dialogs from "./Components/Dialogs/Dialogs";
import Users from "./Components/Users/Users";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
   return (
      <BrowserRouter>
         <div className="App">
            <Header/>
            <Sidebar/>
            <div className="App-content">
               <Routes>
                  <Route path="/profile" element={<Profile/>}/>
                  <Route path="/messages" element={<Dialogs/>}/>
                  <Route path="/users" element={<Users/>}/>
               </Routes>
            </div>
         </div>
      </BrowserRouter>
   );
}

export default App;
