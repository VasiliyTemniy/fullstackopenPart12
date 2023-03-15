import { useField } from '../hooks'
import { useSelector, useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CreateBlogForm = ({ createBlogFormRef }) => {
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetBlogUrl, ...blogUrl } = useField('text')

  const user = useSelector((state) => state.login)

  const dispatch = useDispatch()

  const handleCreateClick = (e) => {
    e.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: blogUrl.value,
    }
    dispatch(createBlog(newBlog, user.username, user.name))
    createBlogFormRef.current.toggleVisibility()
    resetTitle()
    resetAuthor()
    resetBlogUrl()
  }

  return (
    <div style={{ paddingBottom: '10px', width: '70%', minWidth: '24rem' }}>
      <h2>create new</h2>
      <Form onSubmit={handleCreateClick}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control name="Title" {...title} />
          <Form.Label>author</Form.Label>
          <Form.Control name="Author" {...author} />
          <Form.Label>url</Form.Label>
          <Form.Control name="Url" {...blogUrl} />
          <Button
            variant="primary"
            id="create-blog-button"
            type="submit"
            style={{ marginTop: '10px' }}
          >
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

CreateBlogForm.displayName = 'CreateBlogForm'

export default CreateBlogForm
