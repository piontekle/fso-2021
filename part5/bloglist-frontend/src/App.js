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
import { createBlog, getAll, removeBlog, setToken, updateBlog } from './services/blogs'
import { login } from './services/login'

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

  const onLogin = async (data) => {
    try {
      console.log(data)
      const { data: user } = await login(data)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setToken(user.token)
      setUser(user)
      setNotif({ message: `${user.username} successfully logged in`, type: 'success' })
      setTimeout(() => resetNotif(), 5000)
    } catch (error) {
      console.log(error)
      setNotif({ message: 'Incorrect username or password', type: 'error' })
      setTimeout(() => resetNotif(), 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedInUser')
    setToken(null)
    setUser(null)
    setNotif({ message: 'Successfully logged out', type: 'success' })
    setTimeout(() => resetNotif(), 5000)
  }

  const onCreateBlog = async (data) => {
    try {
      const { data: newBlog } = await createBlog(data)
      setSortedBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisibility()
      setNotif({ message: `Successfully created ${newBlog.title} entry`, type: 'success' })
      setTimeout(() => resetNotif(), 5000)
    } catch (error) {
      console.log(error)
      setNotif({ message: `Unable to create ${data.title}`, type: 'error' })
      setTimeout(() => resetNotif(), 5000)
    }
  }

  const onUpdateBlog = async (blog) => {
    try {
      const { data: updatedBlog } = await updateBlog(blog)
      const updatedBlogs = map(blogs, blog => {
        if (blog.id === updatedBlog.id) {
          return updatedBlog
        }
        return blog
      })
      setSortedBlogs(updatedBlogs)
    } catch (error) {
      setNotif({ message: `Unable to update ${blog.title}`, type: 'error' })
      setTimeout(() => resetNotif(), 5000)
    }
  }

  const onRemoveBlog = async (blogId) => {
    try {
      await removeBlog(blogId)
      const filtered = filter(blogs, blog => blog.id !== blogId)
      setSortedBlogs(filtered)
    } catch (error) {
      setNotif({ message: 'Unable to remove blog', type: 'error' })
      setTimeout(() => resetNotif(), 5000)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      {notif !== null &&
        <Notification message={notif.message} type={notif.type} />
      }
      {user ? (
        <>
          <div>
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
      ) : <LoginForm onLogin={onLogin} />
      }
    </div>
  )
}

export default App