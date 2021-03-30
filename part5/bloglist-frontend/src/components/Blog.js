import React from 'react'
import PropTypes from 'prop-types'

import { Button, Togglable } from '../components'
import { removeBlog, updateBlog } from '../services/blogs'

const Blog = ({ blog, onRemoveBlog, onUpdateBlog }) => {
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

  const remove = async (id) => {
    try {
      await removeBlog(id)
      onRemoveBlog(id)
    } catch(error) {
      onRemoveBlog(null)
      console.log(error)
    }
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
        <div>{blog.user?.name}</div>
        <Button label="remove" onClick={() => remove(blog.id)} />
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onRemoveBlog: PropTypes.func.isRequired,
  onUpdateBlog: PropTypes.func.isRequired,
}

export default Blog