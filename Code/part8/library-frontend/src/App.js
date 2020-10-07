
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useQuery, useMutation } from '@apollo/client'
import BirthdayForm from './components/BirthdayForm'


const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

const ALL_BOOKS = gql`
query {
  allBooks {
    title
    published
    author
    id
    genres
  }
}
`

const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author
      id
      genres
    }
  }
`

const EDIT_BIRTHDAY = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name 
      bookCount
      born
      id
    }
  }
`

const App = () => {

  const [page, setPage] = useState('authors')
  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)

  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })
  const [editBirthday] = useMutation(EDIT_BIRTHDAY, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (authorsResult.loading || booksResult.loading) {
    return <div> loading... </div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={authorsResult} />
      <BirthdayForm show={page === 'authors'} authors={authorsResult} editBirthday={editBirthday}/>

      <Books show={page === 'books'} books={booksResult} />

      <NewBook show={page === 'add'} addBook={addBook} />

    </div>
  )
}

export default App



