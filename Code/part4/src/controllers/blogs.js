const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (req, res) => {

  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1 
  })

  res.json(blogs)

  // // Promise chaining method 
  // Blog
  //   .find({})
  //   .then(blogs => {
  //     response.json(blogs)
  //   })

})

blogRouter.post('/', async (req, res) => {

  const body = req.body 

  if (!body.title || !body.author){

    res.status(400).json({
      error: "missing title or url"
    })
    
  } else {
    
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
  
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(body.userId)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.json(savedBlog.toJSON())
    
    // // Promise chaining method 
    // blog
    //   .save()
    //   .then(savedBlog => {
    //     res.json(savedBlog.toJSON())
    //   })

  }
})

blogRouter.delete('/:id', async (request, response) => {

  const token = request.token
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!request || !decodedToken) {
    return response.status(401).json( { error: 'token missing or invalid ' })
  }

  const blog = await Blog.findById(request.params.id)
  if ( blog.user.toString() !== decodedToken.id.toString()) {
    return response.status(401).json( { error: 'permission denied ' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()

})

blogRouter.put('/:id', async (req, res) => {

  const id = req.params.id;
  const blog = req.body;

  await Blog.findByIdAndUpdate(id, blog)
  res.status(204).end()
})

module.exports = blogRouter
