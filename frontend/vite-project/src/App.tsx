import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { UserContext } from "./context/userContext";
import './App.css'

function App() {


  interface ProtectedRouteProps {
    children: React.ReactNode
  }

  const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user } = useContext(UserContext)

    if (!user) {
      // If a user is not logged in, redirect to the login page
      return <Navigate to="/login" />
    }

    return <>{children}</>
  }

  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
