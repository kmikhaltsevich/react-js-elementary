import React, { useState } from 'react'
import MyInput from './UI/input/MyInput'
import MyButton from './UI/button/MyButton'

const PostForm = ({createPost}) => {
  const [post, setPost] = useState({
    title: 'title',
    description: 'description'
  })

  const handleChange = e => {
    const { name, value } = e.target
    setPost(prevState => ({ ...prevState, [name]: value }))
  }

  const addPost = (e) => {
    e.preventDefault()
    const id = Math.floor(Math.random() * 1000)
    createPost({ id, ...post })
    setPost({ title: '', description: '' })
  }

  return (
    <form>
      <MyInput type="text" value={post.title} onChange={handleChange} name="title" />
      <MyInput type="text" value={post.description} onChange={handleChange} name="description" />
      <MyButton onClick={addPost}>add post</MyButton>
    </form>
  )
}

export default PostForm
