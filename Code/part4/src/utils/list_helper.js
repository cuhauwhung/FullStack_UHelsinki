
const dummy = (blogs) => {
    return 1
}

const totalLikes = blogs => {
    return blogs.reduce((acc, blog) => {
        return acc + blog.likes;
    }, 0);
}

const favoriteBlog = blogs => {

    var likeCounts = blogs.map(blog => blog.likes)
    var idx = likeCounts.indexOf(Math.max(...likeCounts))

    return (!blogs.length) ? null : {
        title: blogs[idx].title,
        author: blogs[idx].author,
        likes: blogs[idx].likes
    }
}

const mostBlogs = blogs => {

    var res = blogs.reduce((res, blog) => {
        res[blog.author] = ((blog.author in res) ? res[blog.author] : 0) + 1
        return res
    }, {})

    if (!blogs.length) {
        return null

    } else {
        var maxKey = Object.keys(res).reduce(function (a, b) { return res[a] > res[b] ? a : b });
        return {
            author: maxKey,
            blogs: res[maxKey]
        }
    }
}

const mostLikes = blogs => {

    var res = blogs.reduce((res, blog) => {
        res[blog.author] = (blog.author in res ? res[blog.author] : 0) + blog.likes
        return res
    }, {})

    if (!blogs.length) {
        return null

    } else {
        var maxKey = Object.keys(res).reduce(function (a, b) { return res[a] > res[b] ? a : b });
        return {
            author: maxKey,
            likes: res[maxKey]
        }
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}