import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'


describe('<BlogForm />', () => {

  test('Form calls event handler with right details', () => {

    const createBlog = jest.fn()
    const newUser = {
      username: 'Dummy',
      password: '123'
    }

    const newBlog = [{
      title: 'test',
      author: 'cuhauw',
      likes: 634
    }]

    const component = render(
      <BlogForm user={newUser} blogs={newBlog} createBlog={createBlog} />
    )

    const formTitle = component.container.querySelector('form')
    const inputTitle = component.container.querySelector('.inputTitle')

    fireEvent.change(inputTitle, {
      target: {
        value: 'test',
      }
    })

    fireEvent.submit(formTitle)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('test')

  })
})