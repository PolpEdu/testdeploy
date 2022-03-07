import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { initContract } from './utils'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
  Link,
} from "react-router-dom";

import Mult from './multiplayer.js';

window.nearInitPromise = initContract()
  .then(() => {
    ReactDOM.render(
      <Router>
        <Routes>
          <Route path="/" element={<App />} >
            <Route path="/:transactionHashes" element={<App />} />
          </Route>
          <Route path='/play' element={<Mult />}></Route>
        </Routes>
      </Router>,
      document.querySelector('#root')
    )
  })
  .catch(console.error)
