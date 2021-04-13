import React from 'react'
import PropTypes from 'prop-types'

import { Button, Togglable } from '../components'

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

  return (
    <div style={blogStyle} data-testid={'blogList-entry'}>
      {blog.title} by {blog.author}
      <Togglable buttonLabel="view" cancelLabel="hide" inline>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <Button label="like" onClick={() => onUpdateBlog({ ...blog, likes: blog.likes + 1 })}/>
        </div>
        <div>{blog.user?.name}</div>
        <Button label="remove" onClick={() => onRemoveBlog(blog.id)} />
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