import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders only title and author by default', () => {
  const blog = {
    id: 123,
    title: 'Testing in a Blog',
    author: 'Bloggy McBlogger',
    likes: 23,
    url: 'https://blogsrus.com',
    user: { name: 'Oliv Blogs' }
  }

  const onUpdateBlog = jest.fn()
  const onRemoveBlog = jest.fn()

  const component = render(
    <Blog blog={blog} onUpdateBlog={onUpdateBlog} onRemoveBlog={onRemoveBlog} />
  )

  const div = component.container.querySelector("[data-testid='blog-123']")
  expect(div).toHaveTextContent('Testing in a Blog')
  expect(div).toHaveTextContent('Bloggy McBlogger')
  expect(div).not.toHaveTextContent('https://blogsrus.com')
})