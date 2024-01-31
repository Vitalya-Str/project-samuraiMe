import {connect} from "react-redux";
import Users from "./Users";
import {
   getUsers,
   setFollowingInProgress,
   subscribeAC, follow,
   unsubscribeAC, unfollow
} from "../../Redux/Users-reducer";
import React from "react";
import Preloader from "../../Common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/hoc";


class UsersContainer extends React.Component {

   componentDidMount() {
      this.props.getUsers(this.props.currentPage, this.props.pageSize)
   }

   onCurrentPage = (pageNumber) => {
      this.props.getUsers(pageNumber, this.props.pageSize)
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
            follow={this.props.follow}
            unfollow={this.props.unfollow}

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
      followingInProgress: state.usersPage.followingInProgress,
   }
}


export default  connect(mapStateToProps, {
   subscribeAC,
   unsubscribeAC,
   setFollowingInProgress,
   getUsers,
   follow,
   unfollow
})(withAuthRedirect(UsersContainer))

