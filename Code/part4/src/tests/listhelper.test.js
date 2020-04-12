const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})


describe('total_lists', () => {

    test('of empty list is zeros', () => {
        const emptyLitsOfBlogs = []
        const result = listHelper.totalLikes(emptyLitsOfBlogs)
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const listWithOneBlog = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            }
        ]

        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {

        const listWithMultpleBlogs = [
            {
                _id: "5a422aa71b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url:
                    "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 5,
                __v: 0
            },
            {
                _id: "5a422aa71b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url:
                    "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 2,
                __v: 0
            },
            {
                _id: "5a422aa71b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url:
                    "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 10,
                __v: 0
            }
        ]

        const result = listHelper.totalLikes(listWithMultpleBlogs)
        expect(result).toBe(17)
    })
})


describe("favorite blog", () => {

    test('of empty list is zeros', () => {
        const emptyLitsOfBlogs = []
        const result = listHelper.favoriteBlog(emptyLitsOfBlogs)
        expect(result).toBe(null)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const listWithOneBlog = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            }
        ]

        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual({
            title: listWithOneBlog[0].title,
            author: listWithOneBlog[0].author,
            likes: listWithOneBlog[0].likes
        })
    })

    test('of a bigger list is calculated right', () => {

        const listWithMultpleBlogs = [
            {
                _id: "5a422aa71b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url:
                    "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 5,
                __v: 0
            },
            {
                _id: "5a422aa71b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url:
                    "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 2,
                __v: 0
            },
            {
                _id: "5a422aa71b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url:
                    "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 10,
                __v: 0
            }
        ]

        const result = listHelper.favoriteBlog(listWithMultpleBlogs)
        expect(result).toEqual({
            title: listWithMultpleBlogs[2].title,
            author: listWithMultpleBlogs[2].author,
            likes: listWithMultpleBlogs[2].likes
        })
    })
})


describe("most blogs", () => {

    test('of empty list is zeros', () => {
        const emptyLitsOfBlogs = []
        const result = listHelper.mostBlogs(emptyLitsOfBlogs)
        expect(result).toBe(null)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const listWithOneBlog = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            }
        ]

        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            blogs: 1
        })
    })

    test('of a bigger list is calculated right', () => {

        const listWithMultpleBlogs = [
            {
                _id: "5a422aa71b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url:
                    "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 5,
                __v: 0
            },
            {
                _id: "5a422aa71b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url:
                    "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 2,
                __v: 0
            },
            {
                _id: "5a422aa71b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url:
                    "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 10,
                __v: 0
            }
        ]

        const result = listHelper.mostBlogs(listWithMultpleBlogs)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            blogs: 3
        })
    })
})


describe("most likes", () => {

    test('of empty list is zeros', () => {
        const emptyLitsOfBlogs = []
        const result = listHelper.mostLikes(emptyLitsOfBlogs)
        expect(result).toBe(null)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const listWithOneBlog = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            }
        ]

        const result = listHelper.mostLikes(listWithOneBlog)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 5
        })
    })

    test('of a bigger list is calculated right', () => {

        const listWithMultpleBlogs = [
            {
                _id: "5a422aa71b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url:
                    "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 5,
                __v: 0
            },
            {
                _id: "5a422aa71b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url:
                    "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 2,
                __v: 0
            },
            {
                _id: "5a422aa71b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url:
                    "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 10,
                __v: 0
            }
        ]

        const result = listHelper.mostLikes(listWithMultpleBlogs)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})



