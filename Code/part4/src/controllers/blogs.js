const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {

  const blogs = await Blog.find({})
  res.json(blogs)

  // // Promise chaining method 
  // Blog
  //   .find({})
  //   .then(blogs => {
  //     response.json(blogs)
  //   })

})

blogRouter.post('/', async (req, res) => {

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes
  })

  if (!req.body.title || !req.body.author){

    res.status(400).json({
      error: "missing title or url"
    })

  } else {

    const savedBlog = await blog.save()
    res.json(savedBlog.toJSON())
    
    // // Promise chaining method 
    // blog
    //   .save()
    //   .then(savedBlog => {
    //     res.json(savedBlog.toJSON())
    //   })

  }
})

blogRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogRouter.put('/:id', async (req, res) => {

  const id = req.params.id;
  const blog = req.body;

  await Blog.findByIdAndUpdate(id, blog)
  res.status(204).end()
})

module.exports = blogRouter
