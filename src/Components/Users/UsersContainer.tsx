import {connect} from "react-redux";
import Users from "./Users";
import {
    requestUsers,
    setFollowingInProgress,
    subscribeAC, follow,
    unsubscribeAC, unfollow
} from "../../Redux/Users-reducer";
import Preloader from "../../Common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../Redux/Users-selectors";
import {UserType} from "../../types/types";
import * as React from "react";

type PropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalItemsCount: number
    users: UserType[]


    getUsers: (currentPage: number, pageSize: number) => void
    unsubscribeAC: () => void
    subscribeAC: () => void
    onCurrentPage: () => void
    follow: () => void
    unfollow: () => void
}

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onCurrentPage = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                totalItemsCount={this.props.totalItemsCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                users={this.props.users}
                unsubscribeAC={this.props.unsubscribeAC}
                subscribeAC={this.props.subscribeAC}
                onCurrentPage={this.onCurrentPage}
                follow={this.props.follow}
                unfollow={this.props.unfollow}

            />
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

export default compose(connect(mapStateToProps, {
    subscribeAC,
    unsubscribeAC,
    setFollowingInProgress,
    getUsers: requestUsers,
    follow,
    unfollow
}))(UsersContainer)


