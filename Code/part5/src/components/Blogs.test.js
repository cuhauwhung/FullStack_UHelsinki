import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blogs from './Blogs'

describe('<Blog />', () => {

  let component
  let mockLikeHandler

  beforeEach(() => {

    mockLikeHandler = jest.fn()
    const newBlog = [{
      title: 'test one',
      author: 'cuhauw',
      likes: 634
    }]

    component = render(
      <Blogs blogs={newBlog} handleLike={mockLikeHandler} handleRemove={() => { }} />
    )
  })

  test('renders author and title, but not likes by default', () => {
    const titleDiv = component.container.querySelector('.blogTitle')
    expect(titleDiv).toBeVisible
  })

  test('url and likes are not shown at start', () => {
    const detailDiv = component.container.querySelector('.blogDetails')
    expect(detailDiv).toHaveStyle('display: none')
  })

  test('after clicking the button, url and likes are displayed', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    const detailDiv = component.container.querySelector('.blogDetails')
    expect(detailDiv).not.toHaveStyle('display: none')
  })

  test('like button clicked twice functions well', () => {

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })

})
