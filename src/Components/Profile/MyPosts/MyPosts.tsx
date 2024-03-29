import s from './MyPosts.module.css'
import Post from "./Post";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../../Common/FormControl/FormControl";
import {required} from "../../../utils/validators/validators";
import {PostType} from "../../../types/types";
import {FC} from "react";

type MyPostsType = {
    posts: PostType[]
    addPostActionCreator: (values: string) => void
}
const MyPosts: FC<MyPostsType> = ({posts, addPostActionCreator}) => {

   const elementPost = posts.map(p => <Post key={p.id} message={p.message} likeCount={p.likeCount} id={p.id}/>)

   const addPost = (value) => {
      addPostActionCreator(value.newPostElement)
   }

   return (
      <div className={s.body}>
         <h3>My post</h3>
         <AddPostRedux onSubmit={addPost}/>
         <div>
            {elementPost}
         </div>
      </div>
   )
}

const AddPostForm = (props) => {
   return (
      <form onSubmit={props.handleSubmit}>
         <div>
            <Field component={Textarea} validate={[required]} name='newPostElement' placeholder='new massege'/>
         </div>
         <button className={s.btn}>Add post</button>
      </form>
   )
}

const AddPostRedux = reduxForm({form: 'AddPostForm'})(AddPostForm)

export default MyPosts