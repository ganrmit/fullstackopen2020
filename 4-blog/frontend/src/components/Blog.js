import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, loggedInUser, removeBlog }) => {
  const [visible, setVisible] = useState(false)
  const { id, title, author, url, likes, user } = blog

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeBlog = () => {
    const newBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1
    }
    updateBlog(newBlog)
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${title} by ${author}?`)) {
      removeBlog(id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {title} {author}
        <button className='show' onClick={toggleVisibility}>
          {visible ? 'hide' : 'show'}
        </button>
      </div>
      {visible &&
        <div>
          {url}
          <br />
          likes {likes} <button className='like' onClick={likeBlog}>like</button>
          <br />
          {user && user.name}
          <br />
          {user && loggedInUser.name === user.name && <button className='remove' onClick={deleteBlog}>remove</button>}
        </div>
      }
    </div>
  )
}

export default Blog
