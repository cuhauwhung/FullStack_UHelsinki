import React from 'react'

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
)

const Blogs = ({ blogs }) => {

  return (
    <div>
    <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>

  )
}

export default Blogs
