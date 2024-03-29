import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {actions} from "../../../Redux/Profile-reducer";
import { AppStateType } from "../../../Redux/store";


const mapStateToProps = (state:AppStateType) => {

   return {
      posts: state.profilePage.posts
   }
}

const addPostActionCreator = actions.addPostActionCreator

const MyPostsContainer = connect (mapStateToProps, {addPostActionCreator})(MyPosts)
export default MyPostsContainer