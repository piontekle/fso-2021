import React, { useState, useEffect } from 'react'

import {
  Blog,
  BlogForm,
  Button,
  LoginForm 
} from './components'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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

  const login = (user) => {
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    blogService.setToken(user.token)
    setUser(user)
  }

  const logout = () => {
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)
    setUser(null)
  }

  const onCreateBlog = (newBlog) => {
    console.log(newBlog)
    setBlogs(blogs.concat(newBlog))
  }

  return (
    <div>
      <h2>blogs</h2>
      {user ? (
          <>
            <div>
              {user.name ? 
                `${user.name} is logged in`
                : 'Logged in'
              }
              <Button onClick={logout} label="Logout" />
              <BlogForm onCreateBlog={onCreateBlog} />
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