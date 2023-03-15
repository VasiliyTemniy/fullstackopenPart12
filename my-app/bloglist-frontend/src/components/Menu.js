import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import logo from '../img/logo.png'

const Menu = ({ user, handleLogoutClick }) => {
  return (
    <Navbar bg="light" variant="light" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            width="35"
            height="35"
            className="d-inline-block align-top"
            alt="Dyachenko logo"
          />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/blogapp/blogs">
            Blogs
          </Nav.Link>
          <Nav.Link as={Link} to="/blogapp/users">
            Users
          </Nav.Link>
        </Nav>
        {user.name !== null ? (
          <Nav>
            <Nav.Link as={Link} to={`/blogapp/users/${user.id}`}>
              {user.name} logged in
            </Nav.Link>
            <Button variant="primary" id="logout" text="logout" onClick={handleLogoutClick}>
              {' '}
              logout{' '}
            </Button>
          </Nav>
        ) : null}
      </Container>
    </Navbar>
  )
}

export default Menu
