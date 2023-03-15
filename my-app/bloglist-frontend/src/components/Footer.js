import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Footer = () => {
  const divStyle = { color: '#ffffff8c', display: 'flex', padding: '0px', flexWrap: 'wrap' }
  const navStyle = { padding: '0rem 0.3rem' }

  return (
    <Navbar bg="dark" variant="dark" fixed="bottom">
      <Container>
        <Nav className="me-auto">
          <div style={divStyle}>
            Intro logo inspired by
            <Nav.Link href="https://prettier.io/" style={navStyle}>
              Prettier logo animation
            </Nav.Link>
            and
            <Nav.Link href="https://www.youtube.com/watch?v=uQNpr09UOAY" style={navStyle}>
              Web Dev Simplified video
            </Nav.Link>
          </div>
        </Nav>
        <Nav>
          <div style={divStyle}>
            Logo layout grid made with
            <Nav.Link href="https://github.com/VasiliyTemniy/image-dotter" style={navStyle}>
              Image-dotter
            </Nav.Link>
            utility app made by VasiliyTemniy
          </div>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Footer

//style={{ position: "relative" }}
