import { useSelector } from 'react-redux'
import { useRef } from 'react'
import Toggleable from './Toggleable'
import CreateBlogForm from './CreateBlogForm'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

const BlogList = () => {
  const stateBlogs = useSelector((state) => state.blogs)
  const blogs = [...stateBlogs]

  const createBlogFormRef = useRef()

  return (
    <Container>
      <Toggleable buttonLabel={'create blog'} exitLabel={'cancel'} ref={createBlogFormRef}>
        <CreateBlogForm createBlogFormRef={createBlogFormRef} />
      </Toggleable>
      <h2>Blogs</h2>
      <ListGroup>
        {blogs
          .sort((blogA, blogB) => blogB.likes - blogA.likes)
          .map((blog) => (
            <ListGroup.Item action key={blog.id}>
              <Nav.Link as={Link} to={`${blog.id}`}>
                {blog.title} {blog.author}
              </Nav.Link>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Container>
  )
}

export default BlogList
