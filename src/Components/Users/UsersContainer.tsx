import { connect } from "react-redux";
import Users from "./Users";
import { requestUsers, follow, unfollow, FilterType } from "../../Redux/Users-reducer";
import Preloader from "../../Common/Preloader/Preloader";
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getsUsers, searchTerm } from "../../Redux/Users-selectors";
import { UserType } from "../../types/types";
import { AppStateType } from "../../Redux/store";
import { Component } from "react";

type MapSateToPropsType = {
  currentPage: number;
  pageSize: number;
  isFetching: boolean;
  totalItemsCount: number;
  users: UserType[];
  followingInProgress: number[];
  filter: FilterType
};
type MapDispatchToPropsType = {
  requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => void;
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
};

type PropsType = MapSateToPropsType & MapDispatchToPropsType;

class UsersContainer extends Component<PropsType> {
  componentDidMount() {
    const { requestUsers, currentPage, pageSize, filter } = this.props;
    requestUsers(currentPage, pageSize, filter);
  }

  onCurrentPage = (pageNumber: number) => {
    const { requestUsers, pageSize, filter } = this.props;
    requestUsers(pageNumber, pageSize, filter);
  };
  searchFormik = (filter: FilterType) => {
    const { requestUsers, pageSize } = this.props;
    requestUsers(1, pageSize, filter);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalItemsCount={this.props.totalItemsCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          users={this.props.users}
          onCurrentPage={this.onCurrentPage}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          followingInProgress={this.props.followingInProgress}
          searchFormik={this.searchFormik}
        />
      </>
    );
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
    filter: searchTerm(state)
  };
};

export default compose(
  connect<MapSateToPropsType, MapDispatchToPropsType>(mapStateToProps, {
    requestUsers,
    follow,
    unfollow,
  })
)(UsersContainer);
