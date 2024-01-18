import {connect} from "react-redux";
import Users from "./Users";
import {
   setCurrentPageAC,
   setTotalUsersCountAC,
   setUsersAC,
   subscribeAC,
   unsubscribeAC
} from "../../Redux/Users-reducer";

const mapStateToProps = (state) => {
   return {
      users: state.usersPage.users,
      pageSize: state.usersPage.pageSize,
      totalUsersCount: state.usersPage.totalUsersCount,
      currentPage: state.usersPage.currentPage
   }
}

const UsersContainer = connect(mapStateToProps, {subscribeAC, unsubscribeAC, setUsersAC, setTotalUsersCountAC, setCurrentPageAC})(Users)

export  default  UsersContainer