import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { likeBlog, addComment, deleteBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'
import { Link, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import FormGroup from 'react-bootstrap/esm/FormGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import Nav from 'react-bootstrap/Nav'
import Toggleable from './Toggleable'
import UpdateBlogForm from './UpdateBlogForm'

const Blog = ({ blogToShow }) => {
  const updateBlogFormRef = useRef()

  const user = useSelector((state) => state.login)

  const navigate = useNavigate()

  const { reset: commentTextReset, ...commentText } = useField('text')
  const dispatch = useDispatch()

  const handleLikeClick = async (e) => {
    e.preventDefault()
    dispatch(likeBlog(blogToShow))
  }

  const handleCommentClick = async (e) => {
    e.preventDefault()
    dispatch(addComment(blogToShow, commentText.value))
    commentTextReset()
  }

  const handleDeleteClick = async (e) => {
    e.preventDefault()
    dispatch(deleteBlog(blogToShow.id, blogToShow.title))
    navigate('../blogs')
  }

  if (!blogToShow) {
    return null
  } else {
    return (
      <Container>
        <h1>{blogToShow.title}</h1>
        <br />
        <h5>Author: {blogToShow.author}</h5>
        <br />
        <p>
          <Nav.Link href={blogToShow.url} style={{ paddingLeft: '0', display: 'inline-block' }}>
            {blogToShow.url}
          </Nav.Link>
        </p>
        <p>
          {blogToShow.likes} likes{' '}
          <Button variant="primary" onClick={handleLikeClick}>
            like
          </Button>
        </p>
        <p>
          added by
          <Nav.Link
            as={Link}
            to={`/blogapp/users/${blogToShow.user.id}`}
            style={{ display: 'inline-block' }}
          >
            {blogToShow.user.name}
          </Nav.Link>
        </p>
        {user.username === blogToShow.user.username ? (
          <Toggleable
            buttonLabel={'update blog'}
            exitLabel={'cancel'}
            secondButtonLabel={'delete'}
            secondButtonClick={handleDeleteClick}
            ref={updateBlogFormRef}
          >
            <UpdateBlogForm updateBlogFormRef={updateBlogFormRef} blogToShow={blogToShow} />
          </Toggleable>
        ) : null}
        <br />
        <h4>comments</h4>
        <div style={{ width: '50%', minWidth: "400px" }}>
          <Form onSubmit={handleCommentClick}>
            <FormGroup>
              <InputGroup>
                <Form.Control name="CommentText" {...commentText} />
                <Button variant="primary" id="create-blog-button" type="submit">
                  add comment
                </Button>
              </InputGroup>
            </FormGroup>
          </Form>
          <ListGroup variant="flush">
            {blogToShow.comments.map((comment, index) => (
              <ListGroup.Item key={index}>{comment}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Container>
    )
  }
}

export default Blog
