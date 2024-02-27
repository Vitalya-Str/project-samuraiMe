import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {addPostActionCreator} from "../../../Redux/Profile-reducer.ts";


const mapStateToProps = (state) => {

   return {
      posts: state.profilePage.posts
   }
}

const MyPostsContainer = connect (mapStateToProps, {addPostActionCreator})(MyPosts)
export default MyPostsContainer