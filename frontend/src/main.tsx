import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.tsx'
import ReactDOM from "react-dom/client"
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { AuthProvider } from './contexts/AuthContext'
import SessionExpiredModal from './components/ui/SessionExpiredModal'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    <SessionExpiredModal />
    </AuthProvider>
  </StrictMode>
);
/*
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
*/