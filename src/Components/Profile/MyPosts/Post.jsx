import s from './Post.module.css'

const Post = ({message, likeCount}) => {

   return (
      <div className={s.body}>
         <img src='https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676296296137285106.png' alt="postLogo"/>
         <div>
            {message}
         </div>
         <div>
            Like: {likeCount}
         </div>

      </div>)
}

export default Post