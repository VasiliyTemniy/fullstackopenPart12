import { useState, forwardRef, useImperativeHandle } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

const Toggleable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <Container>
      <div style={{ ...hideWhenVisible, paddingBottom: '10px' }}>
        <ButtonGroup>
          <Button variant="primary" onClick={toggleVisibility}>
            {props.buttonLabel}
          </Button>
          {props.secondButtonLabel ? (
            <Button variant="outline-primary" onClick={props.secondButtonClick}>
              {props.secondButtonLabel}
            </Button>
          ) : null}
        </ButtonGroup>
      </div>
      <div style={{ ...showWhenVisible, paddingBottom: '10px' }}>
        {props.children}
        <Button variant="primary" onClick={toggleVisibility}>
          {props.exitLabel}
        </Button>
      </div>
    </Container>
  )
})

Toggleable.displayName = 'Toggleable'

export default Toggleable
