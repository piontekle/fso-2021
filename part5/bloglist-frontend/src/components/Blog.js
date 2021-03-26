import React from 'react'

import { Button, Togglable } from '../components';

const Blog = ({ blog }) => {
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
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <Togglable buttonLabel="view" cancelLabel="hide" inline>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <Button label="like" onClick={() => console.log('like')}/>
        </div>
        <div>{blog?.user?.name}</div>
      </Togglable>
    </div>  
  )
}

export default Blog