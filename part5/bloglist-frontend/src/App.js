import React, { useEffect, useRef, useState } from 'react'

import {
  Blog,
  BlogForm,
  Button,
  LoginForm,
  Notification,
  Togglable,
} from './components'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notif, setNotif] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  const resetNotif = () => setNotif(null)

  const login = (user) => {
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    blogService.setToken(user.token)
    setUser(user)
    setNotif({ message: `${user.username} successfully logged in`, type: 'success' })
    setTimeout(() => resetNotif(), 5000);
  }

  const logout = () => {
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)
    setUser(null)
    setNotif({ message: 'Successfully logged out', type: 'success' })
    setTimeout(() => resetNotif(), 5000);
  }

  const onCreateBlog = (newBlog) => {
    setBlogs(blogs.concat(newBlog))
    blogFormRef.current.toggleVisibility()
    setNotif({ message: `Successfully created ${newBlog.title} entry`, type: 'success' })
    setTimeout(() => resetNotif(), 5000);
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
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </>
        ) : <LoginForm onLogin={login} />
      }
    </div>
  )
}

export default App