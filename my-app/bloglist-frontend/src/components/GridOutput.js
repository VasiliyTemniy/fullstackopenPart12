import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/gridOutput.css'
import grid_initial from '../grids/grid_initial.json'
import grid_initial_highlight from '../grids/grid_initial_highlight.json'
import grid_plain from '../grids/grid_plain.json'
import grid_letter from '../grids/grid_letter.json'

const GridOutput = () => {
  const [clicked, setClicked] = useState(false)

  const navigate = useNavigate()

  const animationEnd = (element) => {
    if (element.classList.contains('show')) {
      element.classList.remove('show')
      element.classList.add('shown')
    }
    if (element.classList.contains('hide')) {
      element.classList.remove('hide')
      element.classList.add('hidden')
    }
  }

  const hoverToggleVisibility = (element1, element2) => {
    if (element1.classList.contains('shown')) {
      element1.classList.remove('shown')
      element1.classList.add('hide')
      element2.classList.remove('hidden')
      element2.classList.add('show')
    } else if (element1.classList.contains('show')) {
      element1.classList.remove('show')
      element1.classList.add('hide')
      element2.classList.remove('hide')
      element2.classList.add('show')
    }
  }

  const mouseEnterHandle = () => {
    if (!clicked) {
      const container = document.getElementById('container-initial')
      const containerHighlight = document.getElementById('container-initial-highlight')
      hoverToggleVisibility(container, containerHighlight)
    }
  }

  const mouseLeaveHandle = () => {
    if (!clicked) {
      const container = document.getElementById('container-initial')
      const containerHighlight = document.getElementById('container-initial-highlight')
      hoverToggleVisibility(containerHighlight, container)
    }
  }

  const hoverAnimationEndHandle = () => {
    if (!clicked) {
      const container = document.getElementById('container-initial')
      animationEnd(container)
    }
  }

  const hoverHighlightAnimationEndHandle = () => {
    if (!clicked) {
      const containerHighlight = document.getElementById('container-initial-highlight')
      animationEnd(containerHighlight)
    }
  }

  const clickHandle = (e) => {
    setClicked(true)
    const container = document.getElementById('container-initial')
    const containerHighlight = document.getElementById('container-initial-highlight')
    const containerLetter = document.getElementById('container-letter')
    container.classList.remove('show')
    container.classList.remove('hide')
    containerHighlight.classList.remove('show')
    containerHighlight.classList.remove('hide')
    containerLetter.classList.add('show-slow')
    setTimeout(() => {
      navigate('/blogapp/blogs')
    }, 8000)
  }

  const outputGrid = (grid, plain = false) =>
    grid.map((row, index) => {
      const style = plain ?
        index % 2 === 1
          ? { '--delay': index, '--offset': '500%' }
          : { '--delay': index, '--offset': '-500%' }
        : null
      return (
        <div key={index} className="row" style={style}>
          {row.map((cell) => (
            <div
              key={'l' + String(cell.row) + 'r' + String(cell.column)}
              className="cell"
              style={{ backgroundColor: cell.color }}
            ></div>
          ))}
        </div>
      )
    })

  return (
    <>
      <div id="background" className="background-container">
        <div
          id="event-vessel"
          className="vessel"
          style={{ zIndex: '1000' }}
          onMouseEnter={mouseEnterHandle}
          onMouseLeave={mouseLeaveHandle}
          onClick={clickHandle}
        ></div>
        <div
          id="container-initial"
          className="container shown"
          onAnimationEnd={hoverAnimationEndHandle}
        >
          {outputGrid(grid_initial)}
        </div>
        <div
          id="container-initial-highlight"
          className="container hidden"
          onAnimationEnd={hoverHighlightAnimationEndHandle}
        >
          {outputGrid(grid_initial_highlight)}
        </div>
        <div id="container-plain" className="container">
          {clicked ? outputGrid(grid_plain, true) : null}
        </div>
        <div id="container-letter" className="container">
          {clicked ? outputGrid(grid_letter) : null}
        </div>
      </div>
    </>
  )
}

GridOutput.displayName = 'GridOutput'

export default GridOutput
