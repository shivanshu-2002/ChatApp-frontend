import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import AppContext from './Context/ContextChat.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppContext>
   <ChakraProvider >
    <App />
    </ChakraProvider>
  </AppContext>,
  </BrowserRouter>
)
