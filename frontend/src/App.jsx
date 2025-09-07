

import AppLayout from "./layouts/AppLayout"
import { ThemeProvider } from "./context/theme-provider"
import { LoginForm } from "./components/common/auth/login-form"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./modules/Admin/Dashboard"
import EnterpriseStructure from "./modules/Admin/EnterpriseStructure"
import Enterprise from "./modules/Admin/Enterprise"
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/enterprise-structure" element={<EnterpriseStructure />} />
        <Route path="/enterprise" element={<Enterprise />} />
      </Route>
      </Routes>

    {/* <AppLayout/> */}
    </ThemeProvider>
  )
}

export default App