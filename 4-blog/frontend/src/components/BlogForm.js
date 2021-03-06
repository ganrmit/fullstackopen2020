import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    })

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return <div>
    <h2>create new</h2>
    <form onSubmit={addBlog}>
      title: <input id='blogTitle' value={blogTitle} onChange={({ target }) => setBlogTitle(target.value)} />
      <br />
      author: <input id='blogAuthor' value={blogAuthor} onChange={({ target }) => setBlogAuthor(target.value)} />
      <br />
      url: <input id='blogUrl' value={blogUrl} onChange={({ target }) => setBlogUrl(target.value)} />
      <br />
      <button id="blog-create-button" type="submit">create</button>
    </form>
  </div>
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm