import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {addPostActionCreator} from "../../../Redux/Profile-reducer";


const mapStateToProps = (state) => {
   return {
      post: state.profilePage.posts
   }
}

const MyPostsContainer = connect (mapStateToProps, {addPostActionCreator})(MyPosts)
export default MyPostsContainer