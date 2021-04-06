import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let blog
  let onUpdateBlog
  let onRemoveBlog

  beforeEach(() => {
    blog = {
      id: 123,
      title: 'Testing in a Blog',
      author: 'Bloggy McBlogger',
      likes: 23,
      url: 'https://blogsrus.com',
      user: { name: 'Oliv Blogs' }
    }
    onUpdateBlog = jest.fn()
    onRemoveBlog = jest.fn()

    component = render(
      <Blog blog={blog} onUpdateBlog={onUpdateBlog} onRemoveBlog={onRemoveBlog} />
    )
  })

  test('renders only title and author by default', () => {
    const div = component.getByTestId('blog-123')
    expect(div).toHaveTextContent('Testing in a Blog')
    expect(div).toHaveTextContent('Bloggy McBlogger')
    expect(div).not.toHaveTextContent('https://blogsrus.com')
    expect(div).not.toHaveTextContent('Oliv Blogs')
    expect(div).not.toHaveTextContent(23)
  })

  test('renders blog details when view is clicked', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const div = component.getByTestId('blog-123')
    expect(div).toHaveTextContent('Testing in a Blog')
    expect(div).toHaveTextContent('Bloggy McBlogger')
    expect(div).toHaveTextContent('https://blogsrus.com')
    expect(div).toHaveTextContent('Oliv Blogs')
    expect(div).toHaveTextContent(23)
  })

  test('like button fires when clicked', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
   
    expect(onUpdateBlog.mock.calls).toHaveLength(2)
  })
})