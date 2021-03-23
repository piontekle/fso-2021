import React, { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import { Blog, Button, LoginForm } from './components'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const methods = useForm({ mode: 'onBlur' })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  const login = (user) => {
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    setUser(user)
  }

  const logout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
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
            </div>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </>
        ) : (
          <FormProvider {...methods}>
            <LoginForm onLogin={login} />
          </FormProvider>
        )
      }
    </div>
  )
}

export default App