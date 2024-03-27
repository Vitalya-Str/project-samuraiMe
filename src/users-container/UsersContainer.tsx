import {connect} from "react-redux";
import Users from "./Users";
import {
    requestUsers,
    follow,
    unfollow
} from "../../Redux/Users-reducer";
import Preloader from "../../Common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getsUsers
} from "../../Redux/Users-selectors";
import {UserType} from "../../types/types";
import {AppStateType} from "../../Redux/store";
import {Component} from "react";

type MapSateToPropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalItemsCount: number
    users: UserType[]
    followingInProgress: number[]
}
type MapDispatchToPropsType = {
    requestUsers: (currentPage: number, pageSize: number) => void
    follow: (userID: number) => void
    unfollow: (userID: number) => void
}

type PropsType = MapSateToPropsType & MapDispatchToPropsType

class UsersContainer extends Component<PropsType> {

    componentDidMount() {
        const {requestUsers, currentPage, pageSize} = this.props
        requestUsers(currentPage, pageSize)
    }

    onCurrentPage = (pageNumber: number) => {
        const {requestUsers, pageSize} = this.props
        requestUsers(pageNumber, pageSize)
    }

    render() {
        const {
            isFetching,
            totalItemsCount,
            pageSize,
            currentPage,
            users,
            follow,
            unfollow,
            followingInProgress,
        } = this.props
        return <>{isFetching ? <Preloader/> : null}
            <Users
                totalItemsCount={totalItemsCount}
                pageSize={pageSize}
                currentPage={currentPage}
                users={users}
                onCurrentPage={this.onCurrentPage}
                follow={follow}
                unfollow={unfollow}
                followingInProgress={followingInProgress}
            />
        </>
    }

}

const mapStateToProps = (state: AppStateType) => {
    return {
        users: getsUsers(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

export default compose(
    connect<MapSateToPropsType, MapDispatchToPropsType>(mapStateToProps, {
        requestUsers,
        follow,
        unfollow
    }))(UsersContainer)


