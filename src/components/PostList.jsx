import React from 'react'
import PostListItem from './PostListItem'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const PostList = ({ posts, removePost }) => {
  if (!posts?.length) {
    return <h1 style={{ marginTop: '14px', textAlign: 'center' }}>Posts not found</h1>
  }
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Список постов: </h1>
      <TransitionGroup>
        {posts.map(post =>
          <CSSTransition
            key={post.id}
            timeout={500}
            classNames="post"
          >
            <PostListItem removePost={removePost} post={post} />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  )
}

export default PostList
