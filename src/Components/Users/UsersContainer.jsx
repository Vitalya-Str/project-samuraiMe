import {connect} from "react-redux";
import Users from "./Users";
import {setUsersAC, subscribeAC, unsubscribeAC} from "../../Redux/Users-reducer";

const mapStateToProps = (state) => {
   return {
      usersPage: state.usersPage
   }
}

const UsersContainer = connect(mapStateToProps, {subscribeAC, unsubscribeAC, setUsersAC})(Users)

export  default  UsersContainer