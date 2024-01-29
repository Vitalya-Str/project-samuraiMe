import {connect} from "react-redux";
import Users from "./Users";
import {
   setCurrentPageAC, setFollowingInProgress, setIsFetching,
   setTotalUsersCountAC,
   setUsersAC,
   subscribeAC,
   unsubscribeAC
} from "../../Redux/Users-reducer";
import React from "react";
import Preloader from "../../Common/Preloader/Preloader";
import {UsersAPI} from "../../api/api";


class UsersContainer extends React.Component {

   componentDidMount() {
      this.props.setIsFetching(true)
      UsersAPI.getUsers(this.props.currentPage, this.props.pageSize)
         .then(data => {
            this.props.setIsFetching(false)
            this.props.setUsersAC(data.items)
            this.props.setTotalUsersCountAC(data.totalCount)
         })

   }

   onCurrentPage = (pageNumber) => {
      this.props.setIsFetching(true)
      this.props.setCurrentPageAC(pageNumber)
      UsersAPI.getUsers(pageNumber, this.props.pageSize)
         .then(data => {
            this.props.setIsFetching(false)
            this.props.setUsersAC(data.items)
         })
   }

   render() {

      return <>
         {this.props.isFetching ? <Preloader/> : null}
         <Users
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            users={this.props.users}
            unsubscribeAC={this.props.unsubscribeAC}
            subscribeAC={this.props.subscribeAC}
            onCurrentPage={this.onCurrentPage}
            followingInProgress={this.props.followingInProgress}
            setFollowingInProgress={this.props.setFollowingInProgress}
         />
      </>
   }
}

const mapStateToProps = (state) => {
   return {
      users: state.usersPage.users,
      pageSize: state.usersPage.pageSize,
      totalUsersCount: state.usersPage.totalUsersCount,
      currentPage: state.usersPage.currentPage,
      isFetching: state.usersPage.isFetching,
      followingInProgress: state.usersPage.followingInProgress
   }
}

UsersContainer = connect(mapStateToProps, {
   subscribeAC,
   unsubscribeAC,
   setUsersAC,
   setTotalUsersCountAC,
   setCurrentPageAC,
   setIsFetching,
   setFollowingInProgress
})(UsersContainer)

export default UsersContainer