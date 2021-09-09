import React, { useEffect, useRef, useState } from 'react'

import { usePosts } from '../hooks/usePost'
import { useFetching } from '../hooks/useFetching'
import { useObserver } from '../hooks/useObserver'
import { getPagesCount } from '../utils/pages'

import PostService from '../API/PostService'

import PostList from '../components/PostList'
import PostForm from '../components/PostForm'
import PostFilter from '../components/PostFilter'
import MyModal from '../components/UI/modal/MyModal'
import MyButton from '../components/UI/button/MyButton'
import MyLoader from '../components/UI/loader/MyLoader'
import MyPagination from '../components/UI/pagination/MyPagination'
import MySelect from '../components/UI/select/MySelect'

function Posts () {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const lastElement = useRef()

  const sortedPostAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  const [fetchPosts, isPostsLoading, postsError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page)
    const totalCount = response.headers['x-total-count']

    setTotalPages(getPagesCount(totalCount, limit))
    setPosts([...posts, ...response.data])
  })

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1)
  })

  useEffect(() => {
    fetchPosts()
  },[page, limit])

  const createPost = (post) => {
    setPosts([...posts, post])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(({ id }) => id !== post.id))
  }

  return (
    <div className="App">
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm createPost={createPost} />
      </MyModal>
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue='Кол-во элементов на странице'
        options={[
          { value: 5, title: '5' },
          { value: 10, title: '10' },
          { value: 15, title: '15' },
          { value: 20, title: '20' }
        ]}
      />
      <PostFilter filter={filter} setFilter={setFilter} />
      <MyButton onClick={() => setModal(true)}>Create post</MyButton>
      <MyPagination totalPages={totalPages} page={page} setPage={setPage}/>
      {
        postsError && <h1>Ошибка получения постов <code>{postsError}</code></h1>
      }
      <PostList removePost={removePost} posts={sortedPostAndSearchedPosts} />
      <div ref={lastElement} style={{height: '80px', width: '100%'}} />
      {
        isPostsLoading && <MyLoader />
      }
    </div>
  )
}

export default Posts
