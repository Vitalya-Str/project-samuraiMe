import {connect} from "react-redux";
import Users from "./Users";
import {setUsersAC, subscribeAC, unsubscribeAC} from "../../Redux/Users-reducer";

const mapStateToProps = (state) => {
   return {
      users: state.usersPage.users
   }
}

const UsersContainer = connect(mapStateToProps, {subscribeAC, unsubscribeAC, setUsersAC})(Users)

export  default  UsersContainer