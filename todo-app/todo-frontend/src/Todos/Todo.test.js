import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test("todo renders the todo's text and done-state", () => {
  const todo = {
    text: 'Do good things and throw them in the sea...',
    done: true
  }

  render(
    <Todo todo={todo} onClickDelete={() => null} onClickComplete={() => null} />,
  )

  const elementShown = screen.getByText(
    'Do good things and throw them in the sea...',
  )
  expect(elementShown).toBeDefined()
})