/* eslint-disable no-unused-vars */
import { useDispatch } from 'react-redux'
import { handleLogin } from '../reducers/loginReducer'
import { createUser } from '../reducers/usersReducer'
import { useField } from '../hooks'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Container from 'react-bootstrap/Container'
import { useState } from 'react'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [signup, setSignup] = useState(false)

  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetName, ...name } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  const handleLoginClick = async (e) => {
    e.preventDefault()
    dispatch(handleLogin(username.value, password.value))
    resetUsername()
    resetPassword()
  }

  const handleSignupClick = async (e) => {
    e.preventDefault()
    const newUser = {
      username: username.value,
      name: name.value,
      password: password.value,
    }
    dispatch(createUser(newUser))
    setTimeout(() => {
      dispatch(handleLogin(username.value, password.value))
    }, 2000)
    resetUsername()
    resetName()
    resetPassword()
  }

  const handleToggleClick = (e) => {
    e.preventDefault()
    setSignup(!signup)
  }

  return (
    <Container style={{ width: '70%', minWidth: '24rem', marginLeft: '0' }}>
      <Form onSubmit={signup ? handleSignupClick : handleLoginClick}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control name="Username" {...username} />
          {signup ? (
            <>
              <Form.Label>full name</Form.Label>
              <Form.Control name="name" {...name} />
            </>
          ) : null}
          <Form.Label>password</Form.Label>
          <Form.Control name="Password" {...password} />
          <ButtonGroup style={{ marginTop: '10px' }}>
            <Button
              variant="primary"
              id="login-button"
              type="submit"
              style={{ paddingLeft: '30px', paddingRight: '30px' }}
            >
              {signup ? 'signup' : 'login'}
            </Button>
            <Button
              variant="outline-primary"
              id="signup-button"
              onClick={handleToggleClick}
              style={{ paddingLeft: '30px', paddingRight: '30px' }}
            >
              {signup ? 'cancel' : 'signup'}
            </Button>
          </ButtonGroup>
        </Form.Group>
      </Form>
    </Container>
  )
}

LoginForm.displayName = 'LoginForm'

export default LoginForm
