import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

const User = ({ userToShow }) => {
  if (!userToShow) {
    return null
  }

  return (
    <Container>
      <h1>{userToShow.name}</h1>
      <h3>added blogs</h3>
      <ListGroup>
        {userToShow.blogs.map((blog) => (
          <ListGroup.Item action key={blog.id}>
            <Nav.Link as={Link} to={`/blogapp/blogs/${blog.id}`}>
              {blog.title}
            </Nav.Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  )
}

export default User
