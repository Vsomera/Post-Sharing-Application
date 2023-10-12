import { useEffect, useContext } from "react"
import { UserContext } from "../context/userContext"
import { useNavigate } from "react-router-dom"
import LeftBar from "../components/LeftBar"
import MidContent from "../components/MidContent"
import RightBar from "../components/RightBar"

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
            <div className="dashboard-container">
                <LeftBar />
                <MidContent />
                <RightBar />
            </div>
        </>
    )
}

export default Dashboard