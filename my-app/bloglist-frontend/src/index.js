import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import App from './App'
import GridOutput from './components/GridOutput'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<GridOutput />} />
        <Route path="/blogapp/*" element={<App />} />
      </Routes>
    </Router>
  </Provider>,
)
