import { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

const UsersList = () => {
  const users = useSelector((state) => state.users)

  return (
    <Container>
      <h2>Users</h2>
      <p></p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Nav.Link as={Link} to={`${user.id}`}>
                  {user.name}
                </Nav.Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default UsersList
