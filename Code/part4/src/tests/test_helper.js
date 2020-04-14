const Blog = require('../models/blog')

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

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}
