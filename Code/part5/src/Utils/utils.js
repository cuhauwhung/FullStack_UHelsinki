const sortBlogs = unsortedBlogs => {
  return unsortedBlogs.sort((a, b) => {
    if (a.likes < b.likes) {
      return 1
    } else {
      return -1
    }
  })
}

export default { sortBlogs }
