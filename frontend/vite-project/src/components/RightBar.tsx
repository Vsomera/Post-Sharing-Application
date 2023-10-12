import { useContext, useEffect } from "react"
import { AnalyticsContext } from "../context/analyticsContext";
import { userInfo } from "../services/authService";
import { UserContext } from "../context/userContext";
import { getAnalytics } from "../services/analyticsService";

const RightBar = () => {

    const { online, postCount, yourPosts, updateOnline, updatePostCount, updateYourPosts } = useContext(AnalyticsContext)!

    const { user } = useContext(UserContext)

    const updateAnalytics = async () => {
        // TODO : fix it does not want to fetch for some reason
        if (user) {
            const verifiedUser = await userInfo(user?.accessToken)
            const fetchAnalytics = await getAnalytics(verifiedUser._id)
            updateOnline(fetchAnalytics?.data.online)
            updatePostCount(fetchAnalytics?.data.postCount)
            updateYourPosts(fetchAnalytics?.data.yourPosts)
        }
    }

    useEffect(() => {
        updateAnalytics()
    }, [user])


    return (
        <div className="right">
            <h2>User Analytics</h2>
            <hr />
            <div>
                <p>Online Users: {online}</p>
                <p>Total Posts : {postCount}</p>
                <p>Your Posts : {yourPosts}</p>
            </div>
        </div>
    )
}

export default RightBar