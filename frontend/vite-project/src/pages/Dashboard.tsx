import { useEffect, useContext } from "react"
import { UserContext } from "../context/userContext"
import { useNavigate } from "react-router-dom"
import { PostContext } from "../context/postsContext"

const Dashboard = () => {

    const navigate = useNavigate()

    const { user } = useContext(UserContext)
    const { posts } = useContext(PostContext)

    useEffect(() => {
        // checks if user is logged in
        if (!user) {
            navigate("/login")
        }
    }, [user, navigate])

    return (
        <>
            <div>
                {posts.map((post) => (
                    <div key={post.postID}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <p>Posted on: {post.postDate}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Dashboard