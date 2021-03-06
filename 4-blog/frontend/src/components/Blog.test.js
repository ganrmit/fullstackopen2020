import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const user = {
    username: 'test username',
    name: 'test name',
    id: '1235678'
  }
  const blog = {
    id: '0',
    title: 'test title',
    author: 'test author',
    url: 'https://www.test.com/',
    likes: 1337,
    user
  }

  let component
  let updateMock

  beforeEach(() => {
    updateMock = jest.fn()
    component = render(<Blog blog={blog} updateBlog={updateMock} loggedInUser={user} />)
  })

  test('blog displays title and author by default', () => {
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).not.toHaveTextContent(blog.likes)
    expect(component.container).not.toHaveTextContent(blog.url)
  })

  test('blog displays urls and likes after clicking show button', () => {
    const button = component.getByText('show')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent(blog.likes)
    expect(component.container).toHaveTextContent(blog.url)
  })

  test('if like button clicked twice update blog is called twice', () => {
    const showButton = component.getByText('show')
    fireEvent.click(showButton)
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(updateMock.mock.calls).toHaveLength(2)
  })
})