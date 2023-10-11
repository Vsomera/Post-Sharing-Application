import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ToastContainer } from 'react-toastify';
import { UserContextProvider } from './context/userContext.tsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
      <ToastContainer theme="dark" position="top-right" className="toastContainerCss" />
    </UserContextProvider>
  </React.StrictMode>
)
