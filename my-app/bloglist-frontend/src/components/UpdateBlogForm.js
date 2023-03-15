/* eslint-disable no-unused-vars */
import { useField } from '../hooks'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlogInfo } from '../reducers/blogReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const UpdateBlogForm = ({ updateBlogFormRef, blogToShow }) => {
  const { reset: resetTitle, ...title } = useField('text', blogToShow.title)
  const { reset: resetAuthor, ...author } = useField('text', blogToShow.author)
  const { reset: resetBlogUrl, ...blogUrl } = useField('text', blogToShow.url)

  const user = useSelector((state) => state.login)

  const dispatch = useDispatch()

  const handleUpdateClick = (e) => {
    e.preventDefault()
    const updateBlog = {
      title: title.value,
      author: author.value,
      url: blogUrl.value,
      id: blogToShow.id,
      user: blogToShow.user,
    }
    dispatch(updateBlogInfo(updateBlog, user.username, user.name))
    updateBlogFormRef.current.toggleVisibility()
  }

  if (!blogToShow) {
    return null
  } else {
    return (
      <div style={{ paddingBottom: '10px', width: '70%', minWidth: '24rem' }}>
        <h2>update blog info</h2>
        <Form onSubmit={handleUpdateClick}>
          <Form.Group>
            <Form.Label>title</Form.Label>
            <Form.Control id="updTitle" name="Title" {...title} />
            <Form.Label>author</Form.Label>
            <Form.Control id="updAuthor" name="Author" {...author} />
            <Form.Label>url</Form.Label>
            <Form.Control id="updUrl" name="Url" {...blogUrl} />
            <Button
              variant="primary"
              id="create-blog-button"
              type="submit"
              style={{ marginTop: '10px' }}
            >
              update blog
            </Button>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

UpdateBlogForm.displayName = 'UpdateBlogForm'

export default UpdateBlogForm
