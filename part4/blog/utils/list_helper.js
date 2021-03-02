const _ = require('lodash')

const dummy = () => {
  return 1
}

const countLikes = (blogs) => {
  const reducer = (acc, curr) => acc + curr.likes
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  let favorite = {}
  blogs.forEach(blog => {
    if (blog.likes > (favorite.likes || 0)) favorite = blog
  })

  return favorite
}

const mostBlogs = (blogs) => {
  return _(blogs)
    .countBy('author')
    .map((count, author) => { return { author, blogs: count } })
    .maxBy('blogs') ?? {}
}

const mostLikes = (blogs) => {
  let most = {}

  most = _(blogs)
    .groupBy('author')
    .map((objs, k) => ({
      author: k,
      likes: _.sumBy(objs, 'likes')
    }))
    .maxBy('likes') ?? {}

  return most
}

module.exports = {
  dummy,
  countLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
