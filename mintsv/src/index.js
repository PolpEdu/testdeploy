import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { initContract } from './utils'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";

window.nearInitPromise = initContract()
  .then(() => {
    ReactDOM.render(
      <Router>
        <Routes>
        <Route path="/" element={<App />}>
          <Route path="/:accid" element={<App />} />  
        </Route>
          
          </Routes>
      </Router>,
      document.querySelector('#root')
    )
  })
  .catch(console.error)
