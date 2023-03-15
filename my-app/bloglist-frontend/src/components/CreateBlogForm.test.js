import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'

test('form calls the event handler it received as props with the right details', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const formUser = {
    username: 'VasiliyTemniy',
    name: 'Mikhail',
    id: 'abcdef456465456456789789',
  }

  render(<CreateBlogForm user={formUser} createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('create')

  await user.type(inputs[0], 'Do good things and throw them in the sea...')
  await user.type(inputs[1], 'Armenian folklore')
  await user.type(inputs[2], 'https://www.youtube.com/watch?v=cR0ou0U3m2g')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Do good things and throw them in the sea...')
  expect(createBlog.mock.calls[0][0].author).toBe('Armenian folklore')
  expect(createBlog.mock.calls[0][0].url).toBe('https://www.youtube.com/watch?v=cR0ou0U3m2g')
})
