import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { handleLogout, login } from './reducers/loginReducer'
import { Routes, Route, useMatch, Outlet } from 'react-router-dom'
import blogService from './services/blogs'
import Notification from './components/Notification.js'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Menu from './components/Menu'
import UsersList from './components/UsersList'
import User from './components/User'
import Blog from './components/Blog'
import Footer from './components/Footer'
import Container from 'react-bootstrap/Container'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.login)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  const matchUser = useMatch('blogapp/users/:id')
  const userToShow = matchUser ? users.find((user) => user.id === matchUser.params.id) : null

  const matchBlog = useMatch('blogapp/blogs/:id')
  const blogToShow = matchBlog ? blogs.find((blog) => blog.id === matchBlog.params.id) : null

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(login(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogoutClick = (e) => {
    e.preventDefault()
    dispatch(handleLogout(user))
  }

  if (user.username !== null) {
    return (
      <>
        <Menu user={user} handleLogoutClick={handleLogoutClick} />
        <Container style={{ paddingBottom: '150px' }}>
          <Notification id="notification" />
          <h2 style={{ paddingTop: '1rem' }}>blog app</h2>
          <br />
          <Outlet />
          <Routes>
            <Route path="/users/:id" element={<User userToShow={userToShow} />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/blogs/:id" element={<Blog blogToShow={blogToShow} />} />
            <Route path="/blogs" element={<BlogList />} />
          </Routes>
        </Container>
        <Footer />
      </>
    )
  } else {
    return (
      <>
        <Menu user={user} handleLogoutClick={handleLogoutClick} />
        <Container style={{ paddingBottom: '150px' }}>
          <Notification id="notification" />
          <h2 style={{ paddingTop: '1rem' }}>blog app</h2>
          <br />
          <h5>Please log in or sign up</h5>
          <br />
          <LoginForm />
        </Container>
        <Footer />
      </>
    )
  }
}

export default App
