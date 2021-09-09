import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import PostService from '../API/PostService'
import MyLoader from '../components/UI/loader/MyLoader'

const PostId = () => {
  const params = useParams()
  const [post, setPost] = useState(null)
  const [postComments, setPostComments] = useState(null)

  const [fetchPostById, isPostLoading, postError] = useFetching(async () => {
    const response = await PostService.getById(params.id)
    setPost(response.data)
  })
  const [fetchComments, isCommentsLoading, commentsError] = useFetching(async () => {
    const response = await PostService.getCommentsById(params.id)
    setPostComments(response.data)
  })

  useEffect(() => {
    fetchPostById()
    fetchComments()
  }, [])

  return (
    <div>
      <h1>Post ID: {params.id}</h1>
      {
        isPostLoading
          ? <MyLoader />
          : post && <div>{post.title}</div>
      }
      {
        postError && <h1>Ошибка получения поста <code>{postError}</code></h1>
      }
      <h1 style={{marginTop: '24px'}}>Comments: </h1>
      {
        isCommentsLoading
          ? <MyLoader />
          : postComments &&
            postComments.map(i =>
              <div key={i.id} style={{marginTop: '12px'}}>
                <strong>{i.email}</strong>
                <p>{i.body}</p>
              </div>
            )
      }
      {
        commentsError && <h1>Ошибка получения комментариев <code>{commentsError}</code></h1>
      }
    </div>
  )
}

export default PostId
