const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })
  

describe("When there is initially some blogs saved", () => {

    test("blogs are returned as json", async() => {
      await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    })

    test("request returns the correct number of blogs", async () => {
        const blogs = await api.get("/api/blogs");
        expect(blogs.body.length).toBe(helper.initialBlogs.length);
      })
})


describe("addition of a new blog", () => {
  test("a valid blog can be added", async() => {

    const newBlog = { 
      title: "NEW TEST",
      author: "Cuhauw",
      url: "http://new_test.com",
      likes: 1
    }

    await api.post('/api/blogs').send(newBlog).expect(200).expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)

    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).toContain("NEW TEST")
  })

  test("blogs with no likes will be defaulted to 0", async () => {
    const newBlog = {
      title: "new blog test",
      author: "Alice",
      url: "https://site.com"
    }

    const savedBlog = await api.post("/api/blogs").send(newBlog)
    expect(savedBlog.body).toHaveProperty("likes", 0)
  })


  test("get a 400 response when title or url is missing from the request", async () => {
    const blogWithoutTitleAndUrl = {
      author: "NEW AUTHOR"
    }

    await api
      .post("/api/blogs")
      .send(blogWithoutTitleAndUrl)
      .expect(400)
  })
})

describe("viewing a specific blog", () =>{
  test("blog has an id property", async() => {
    const blogs = await api.get("/api/blogs");
    const blogToCheck = blogs.body[0]
    expect(blogToCheck.id).toBeDefined();
  })
})

afterAll(() => {
    mongoose.connection.close()
})