const { ApolloServer, gql } = require('apollo-server')
const uuid = require('uuid/v1')
const mongoose = require('mongoose')

const Book = require('./models/bookModel')
const Author = require('./models/authorModel')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://cuhauw:willy@cluster0-f3gte.mongodb.net/part8?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`

    type Book {
        title: String!
        published: Int!
        author: String!
        id: ID!
        genres: [String]!
    }
    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
    }
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book]
        allAuthors: [Author]
    }

    type Mutation {
        addBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book
        editAuthor(name: String!, setBornTo: Int!): Author
    }
`

const resolvers = {

    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: (root, args) => {
           
            if(args.genre) {
                return Book.find({
                  genres: {$all: [args.genre]}
                }).populate('authors')
            }
            
            return Book.find({}).populate('authors')
        },

        allAuthors: () => {
            return Author.find({})
        }
    },

    Mutation: {

        addBook: async (root, args) => {

            const book = new Book({...args})
            const savedBook = await book.save();
            return Book.populate(savedBook, {path: "authors"});
    
        },

        editAuthor: async (root, args) => {
            return Author.findOneAndUpdate({
                name: args.name
              }, {
                born: args.setBornTo
              }, {
                new: true
              })
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})


