import React from 'react'
import MyButton from './UI/button/MyButton'
import { useHistory } from 'react-router-dom'

const PostListItem = ({ post, removePost }) => {
  const route = useHistory()
  return (
    <div className='post'>
      <div className='post__content'>
        <strong>{post.title}</strong>
        <div>{post.description}</div>
      </div>
      <div className='post__btns'>
        <MyButton onClick={() => removePost(post)}>Delete</MyButton>
        <MyButton onClick={() => route.push(`/posts/${post.id}`)}>Open</MyButton>
      </div>
    </div>
  )
}

export default PostListItem
