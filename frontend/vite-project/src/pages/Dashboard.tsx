import { useEffect, useContext } from "react"
import { UserContext } from "../context/userContext"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {

    const navigate = useNavigate()
    const { user } = useContext(UserContext)

    useEffect(() => {
        // checks if user is logged in
        if (!user) {
            navigate("/login")
        }
    }, [user, navigate])

    return (
        <>
            Dashboard Page
        </>
    )
}

export default Dashboard