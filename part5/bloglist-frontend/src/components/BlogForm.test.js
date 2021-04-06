import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<Blog />', () => {
  let component
  let createBlogMock

  beforeEach(() => {
    createBlogMock = jest.fn()

    component = render(
      <BlogForm onCreateBlog={createBlogMock} />
    )
  })

  test('sends correct data on submit', async () => {
    const titleInput = component.getByTestId('title')
    const authorInput = component.getByTestId('author')
    const urlInput = component.getByTestId('url')
    const submitButton = component.getByText('create')

    fireEvent.input(titleInput, { 
      target: { value: 'Testing That Title' } 
    })
    fireEvent.input(authorInput, { 
      target: { value: 'Author Tester' } 
    })
    fireEvent.input(urlInput, { 
      target: { value: 'test.com' } 
    })

    fireEvent.submit(submitButton)
    await waitFor(() => expect(component.queryAllByTestId('error')).toHaveLength(0))
    expect(createBlogMock.mock.calls).toHaveLength(1)
    expect(createBlogMock.mock.calls[0][0].title).toBe('Testing That Title')
    expect(createBlogMock.mock.calls[0][0].author).toBe('Author Tester')
    expect(createBlogMock.mock.calls[0][0].url).toBe('test.com')
  })

  test('does not submit without title', async () => {
    const titleInput = component.getByTestId('title')
    const authorInput = component.getByTestId('author')
    const urlInput = component.getByTestId('url')
    const submitButton = component.getByText('create')

    fireEvent.input(authorInput, { 
      target: { value: '' } 
    })
    fireEvent.input(authorInput, { 
      target: { value: 'Author Tester' } 
    })
    fireEvent.input(urlInput, { 
      target: { value: 'test.com' } 
    })

    fireEvent.submit(submitButton)
    expect(await component.findAllByTestId('error')).toHaveLength(1)
    expect(createBlogMock.mock.calls).toHaveLength(0)
  })
})