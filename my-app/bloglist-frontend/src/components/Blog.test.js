import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test("blog renders the blog's title and author, but does not render its url or number of likes by default", () => {
  const blog = {
    title: 'Do good things and throw them in the sea...',
    author: 'Armenian folklore',
    url: 'https://www.youtube.com/watch?v=cR0ou0U3m2g',
    likes: 9001,
    user: 'abcdef123123456456789789',
  }

  const { container } = render(
    <Blog blog={blog} likeBlogHandle={() => null} deleteBlogHandle={() => null} />,
  )

  const elementShown = screen.getByText(
    'Do good things and throw them in the sea... Armenian folklore',
  )
  expect(elementShown).toBeDefined()

  const otherHidden = container.querySelector('.blogDetails')
  expect(otherHidden).toHaveStyle('display: none')
  const otherShown = container.querySelector('.shownDefault')
  expect(otherShown).toHaveStyle('display: block')
})

test('blog renders details when button "show" is clicked', async () => {
  const blog = {
    title: 'Do good things and throw them in the sea...',
    author: 'Armenian folklore',
    url: 'https://www.youtube.com/watch?v=cR0ou0U3m2g',
    likes: 9001,
    user: 'abcdef123123456456789789',
  }

  const { container } = render(
    <Blog blog={blog} likeBlogHandle={() => null} deleteBlogHandle={() => null} />,
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const otherHidden = container.querySelector('.blogDetails')
  expect(otherHidden).toHaveStyle('display: block')
  const otherShown = container.querySelector('.shownDefault')
  expect(otherShown).toHaveStyle('display: block')
})

test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
  const blog = {
    title: 'Do good things and throw them in the sea...',
    author: 'Armenian folklore',
    url: 'https://www.youtube.com/watch?v=cR0ou0U3m2g',
    likes: 9001,
    user: 'abcdef123123456456789789',
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} likeBlogHandle={mockHandler} deleteBlogHandle={() => null} />)

  const user = userEvent.setup()
  const showButton = screen.getByText('view')
  await user.click(showButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
