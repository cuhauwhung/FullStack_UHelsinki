const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const initialBlogs = [
    {
        title: "Willy's website",
        author: "Cuhauw",
        url: "http://web.cs.ucla.edu/~cuhauwhung/",
        likes: 500
    },
    {
        title: "What is life",
        author: "Cuhauw",
        url: "http://whatislife.com",
        likes: 1
    },
    {
        title: "Niubility",
        author: "Wilbur",
        url: "http://niubility.com",
        likes: 1
    }
]

const initialUsers = [
    {
        username: "Bilbong",
        name: 'cuhauw',
        passwordHash: "$2b$10$eP/QwWBkQvfsKgwHe/ZvTeR04kAXs3RPbXGMeqFVKe0xysQOFK792"
    }
]

const getToken = async () => {
    const user = await User.findOne({ username: 'Bilbong' })
    return jwt.sign(
        {
            username: user.username,
            id: user.id
        },
        config.SECRET)
}

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon' })
    await blog.save()
    await blog.remove()
    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, initialUsers, nonExistingId, getToken, blogsInDb, usersInDB
}
