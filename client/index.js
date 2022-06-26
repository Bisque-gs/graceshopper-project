import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './App'
import { ChakraProvider } from "@chakra-ui/react"

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Router>
  </Provider>,
  document.getElementById("app")
)
