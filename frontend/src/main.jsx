import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "@/components/ui/sonner"
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth-context.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>

     <Toaster />
    <App />
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
