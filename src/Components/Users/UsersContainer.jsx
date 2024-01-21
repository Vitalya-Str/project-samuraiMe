import {connect} from "react-redux";
import Users from "./Users";
import {
   setCurrentPageAC, setIsFetching,
   setTotalUsersCountAC,
   setUsersAC,
   subscribeAC,
   unsubscribeAC
} from "../../Redux/Users-reducer";
import React from "react";
import axios from "axios";
import Preloader from "../../Common/Preloader/Preloader";


class UsersContainer extends React.Component {

   componentDidMount() {
      this.props.setIsFetching(true)
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
         .then(response => {
            this.props.setIsFetching(false)
            this.props.setUsersAC(response.data.items)
            this.props.setTotalUsersCountAC(response.data.totalCount)
         })

   }

   onCurrentPage = (pageNumber) => {
      this.props.setIsFetching(true)
      this.props.setCurrentPageAC(pageNumber)
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
         .then(response => {
            this.props.setIsFetching(false)
            this.props.setUsersAC(response.data.items)
         })
   }

   render() {

      return <>

         {this.props.isFetching ? <Preloader/> :
            <Users
               totalUsersCount={this.props.totalUsersCount}
               pageSize={this.props.pageSize}
               currentPage={this.props.currentPage}
               users={this.props.users}
               unsubscribeAC={this.props.unsubscribeAC}
               subscribeAC={this.props.subscribeAC}
               onCurrentPage={this.onCurrentPage}
            />}


      </>
   }
}

const mapStateToProps = (state) => {
   return {
      users: state.usersPage.users,
      pageSize: state.usersPage.pageSize,
      totalUsersCount: state.usersPage.totalUsersCount,
      currentPage: state.usersPage.currentPage,
      isFetching: state.usersPage.isFetching
   }
}

UsersContainer = connect(mapStateToProps, {
   subscribeAC,
   unsubscribeAC,
   setUsersAC,
   setTotalUsersCountAC,
   setCurrentPageAC,
   setIsFetching
})(UsersContainer)

export default UsersContainer