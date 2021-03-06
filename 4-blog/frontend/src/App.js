import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogsRaw] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const setBlogs = newBlogs => setBlogsRaw(newBlogs.sort(
    (blogA, blogB) => blogB.likes - blogA.likes
  ))

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification(`${user.name} logged in`)
      setTimeout(() => { setNotification(null) }, 5000)
    } catch (exception) {
      setNotification('Wrong credentials')
      setTimeout(() => { setNotification(null) }, 5000)
    }
  }

  const handleLogout = async () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  const createBlog = async blogObject => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => { setNotification(null) }, 5000)
    } catch (exception) {
      setNotification(exception)
      setTimeout(() => { setNotification(null) }, 5000)
    }
  }

  const updateBlog = async blogObject => {
    try {
      const returnedBlog = await blogService.update(blogObject.id, blogObject)
      setBlogs(blogs.map(b => b.id === returnedBlog.id ? returnedBlog : b))
    } catch (exception) {
      setNotification(exception)
      setTimeout(() => { setNotification(null) }, 5000)
    }
  }

  const removeBlog = async id => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
    } catch (exception) {
      setNotification(exception)
      setTimeout(() => { setNotification(null) }, 5000)
    }
  }

  if (!user) {
    return <LoginForm notification={notification} handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
  }

  return (
    <div>
      <h2>blogs</h2>
      <div className="notification">{notification}</div>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <Toggleable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Toggleable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} loggedInUser={user} removeBlog={removeBlog} />
      )}
    </div>
  )
}

export default App