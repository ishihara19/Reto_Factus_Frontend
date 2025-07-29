import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.tsx'
import ReactDOM from "react-dom/client"
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
/*
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
*/