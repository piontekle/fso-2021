import React from 'react'

import { Button, Togglable } from '../components'
import { updateBlog } from '../services/blogs'

const Blog = ({ blog, onUpdateBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 5,
    border: 'solid',
    borderWidth: 1,
    borderRadius: 2,
    margin: 5
  }

  const updateLike = async (blog) => {
    const res = await updateBlog({ 
      ...blog,
      likes: blog.likes + 1 
    })
    onUpdateBlog(res.data)
  }

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <Togglable buttonLabel="view" cancelLabel="hide" inline>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <Button label="like" onClick={() => updateLike(blog)}/>
        </div>
        <div>{blog?.user?.name}</div>
      </Togglable>
    </div>  
  )
}

export default Blog