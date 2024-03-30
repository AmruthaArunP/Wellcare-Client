import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthProvider from './context/authContext.jsx'
import { Provider } from 'react-redux'
import Store from './redux/Store.js'
import { SocketProvider } from './context/socket/socketProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SocketProvider>
      <Provider store = {Store}>
        <App />
      </Provider>
      </SocketProvider>
    </AuthProvider>
  </React.StrictMode>,
)
