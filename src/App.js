import './App.css';
import Profile from "./Components/Profile/Profile";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Dialogs from "./Components/Dialogs/Dialogs";
import Users from "./Components/Users/Users";

function App() {
   return (
      <div className="App">
         <header className="App-header">
            <Header/>
         </header>
         <div className="App-sidebar">
            <Sidebar/>
         </div>

         <div className="App-content">
            <Profile/>
            <Dialogs/>
            <Users/>
         </div>
      </div>
   );
}

export default App;
