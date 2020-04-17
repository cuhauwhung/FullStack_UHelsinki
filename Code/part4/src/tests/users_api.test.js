const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    const userObjects = helper.initialUsers
      .map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
  })

describe("retrieving users", () => {
  test("returns 200 response", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("returns the correct number of users", async () => {
    const users = await api.get("/api/users")
    expect(users.body.length).toBe(helper.initialUsers.length);
  })
})

describe("creating users", () => {
  test("works correctly", async () => {

    const newUser = {
      name: "dummy",
      username: "test",
      password: "12345"
    }

    const returnedUser = await api.post("/api/users").send(newUser)

    expect(returnedUser.body.name).toBe(newUser.name)
    expect(returnedUser.body.username).toBe(newUser.username)
    
  })

  test("with a username lower than 3 character server sends 400 and error", async () => {
    const userWithShortUserName = {
      username: "A",
      password: "12345"
    }

    const apiResponse = await api
      .post("/api/users")
      .send(userWithShortUserName)

    expect(apiResponse.status).toBe(400)
    expect(apiResponse.body).toHaveProperty("error")
  })

  test("with a password lower than 3 character server sends 400 and an error", async () => {
    const userWithShortPassword = {
      username: "username",
      password: "12"
    }

    const apiResponse = await api
      .post("/api/users")
      .send(userWithShortPassword)

    expect(apiResponse.status).toBe(400)
    expect(apiResponse.body).toHaveProperty("error")
  })
})


afterAll(() => {
  mongoose.connection.close()
})
