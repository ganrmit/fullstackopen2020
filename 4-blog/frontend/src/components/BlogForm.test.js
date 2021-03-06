import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()
  const component = render(<BlogForm createBlog={createBlog} />)

  const title = component.container.querySelector('#blogTitle')
  const author = component.container.querySelector('#blogAuthor')
  const url = component.container.querySelector('#blogUrl')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'new blog title' }
  })
  fireEvent.change(author, {
    target: { value: 'new blog author' }
  })
  fireEvent.change(url, {
    target: { value: 'new blog url' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('new blog title')
  expect(createBlog.mock.calls[0][0].author).toBe('new blog author')
  expect(createBlog.mock.calls[0][0].url).toBe('new blog url')
})