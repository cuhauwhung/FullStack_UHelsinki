const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {

  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  await User.deleteMany({})
  const userObject = new User(helper.initialUsers[0])
  await userObject.save()
})

describe("When there is initially some blogs saved", () => {

  test("blogs are returned as json", async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
  })

  test("request returns the correct number of blogs", async () => {
    const blogs = await api.get("/api/blogs");
    expect(blogs.body.length).toBe(helper.initialBlogs.length);
  })
})  

describe("addition of a new blog", () => {
  test("a valid blog can be added", async () => {

    const user = await helper.usersInDB()
    const user_id = user[0].id

    const newBlog = {
      title: "NEW TEST",
      author: "Cuhauw",
      url: "http://new_test.com",
      likes: 1,
      userId: user_id
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${await helper.getToken()}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    console.log(blogsAtEnd)
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).toContain("NEW TEST")
  })

  test("blogs with no likes will be defaulted to 0", async () => {

    const user = await helper.usersInDB()
    const user_id = user[0].id

    const newBlog = {
      title: "new blog test",
      author: "Alice",
      url: "https://site.com",
      userId: user_id
    }

    const savedBlog = await api.post("/api/blogs")
                               .set('Authorization', `bearer ${await helper.getToken()}`)
                               .send(newBlog)

    // const savedBlog = await api.post("/api/blogs").set({Authorization: `bearer ${token}`}).send(newBlog)
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

describe("viewing a specific blog", () => {
  test("blog has an id property", async () => {
    const blogs = await api.get("/api/blogs");
    const blogToCheck = blogs.body[0]
    expect(blogToCheck.id).toBeDefined();
  })
})

afterAll(() => {
  mongoose.connection.close()
})