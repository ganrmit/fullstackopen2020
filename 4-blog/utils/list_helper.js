const dummy = () => 1

const totalLikes = blogs => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = blogs => {
  if(blogs.length === 0) {
    return {}
  }

  return blogs.reduce((favorite, blog) =>
    blog.likes > favorite.likes ? blog : favorite
  )
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}