import React, { useEffect, useRef, useState } from 'react'
import filter from 'lodash/filter'
import map from 'lodash/map'
import sortBy from 'lodash/sortBy'

import {
  Blog,
  BlogForm,
  Button,
  LoginForm,
  Notification,
  Togglable,
} from './components'
import { getAll, setToken } from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notif, setNotif] = useState(null)

  const setSortedBlogs = (blogs) => {
    const sorted = sortBy(blogs, blog => -blog.likes)
    setBlogs(sorted)
  }

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      setToken(user.token)
    }
    getAll().then(blogs =>
      setSortedBlogs(blogs)
    )  
  }, [])

  const resetNotif = () => setNotif(null)

  const login = (user) => {
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    setToken(user.token)
    setUser(user)
    setNotif({ message: `${user.username} successfully logged in`, type: 'success' })
    setTimeout(() => resetNotif(), 5000);
  }

  const logout = () => {
    window.localStorage.removeItem('loggedInUser')
    setToken(null)
    setUser(null)
    setNotif({ message: 'Successfully logged out', type: 'success' })
    setTimeout(() => resetNotif(), 5000);
  }

  const onCreateBlog = (newBlog) => {
    setSortedBlogs(blogs.concat(newBlog))
    blogFormRef.current.toggleVisibility()
    setNotif({ message: `Successfully created ${newBlog.title} entry`, type: 'success' })
    setTimeout(() => resetNotif(), 5000);
  }

  const onUpdateBlog = (updatedBlog) => {
    const updatedBlogs = map(blogs, blog => {
      if (blog.id === updatedBlog.id) {
        return updatedBlog
      }
      return blog
    })
    setSortedBlogs(updatedBlogs)
  }

  const onRemoveBlog = (blogId) => {
    const filtered = filter(blogs, blog => blog.id !== blogId)
    setSortedBlogs(filtered)
  }

  return (
    <div>
      <h2>blogs</h2>
      {user ? (
          <>
            <div>
              {notif !== null && 
                <Notification message={notif.message} type={notif.type} />
              }
              <div>
                {user.name ? 
                  `${user.name} is logged in`
                  : 'Logged in'
                }
              </div>
              <Button onClick={logout} label="Logout" />
              <Togglable buttonLabel='new blog' ref={blogFormRef}>
                <BlogForm onCreateBlog={onCreateBlog} />
              </Togglable>
            </div>
            {map(blogs, blog =>
              <Blog
                key={blog.id}
                blog={blog}
                onRemoveBlog={onRemoveBlog}
                onUpdateBlog={onUpdateBlog} 
              />
            )}
          </>
        ) : <LoginForm onLogin={login} />
      }
    </div>
  )
}

export default App