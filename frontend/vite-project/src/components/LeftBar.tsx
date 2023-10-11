import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/userContext"
import { PostContext } from "../context/postsContext"
import { addPostDB } from "../services/analyticsService"
import { userInfo } from "../services/authService"
import { logOut } from "../services/authService"

const LeftBar = () => {

    const { user, setUser } = useContext(UserContext)
    const { addPost } = useContext(PostContext)

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const navigate = useNavigate()

    const handleAdd = async () => {
        // adds a new post
        const userID = await userInfo(user?.accessToken || "")
        const currDate = new Date()
        const formattedDate = currDate.toUTCString();

        const newPost = {
            postID: 123,
            title: title,
            content: content,
            postDate: formattedDate,
            userID: userID._id,
        }

        addPost(newPost)
        addPostDB(user?.accessToken || "", title, content)

        setTitle("")
        setContent("")
    }

    const handleLogout = async () => {
        setUser(null)
        logOut()
        navigate("/register")
    }

    return (
        <div className="left">

            <div className="addPost-container">

                <div className="addPost" onClick={() => { handleAdd() }}>
                    <p>Add Post</p>
                </div>

                <div className="post-inputs">
                    <input
                        value={title}
                        placeholder="Post Title"
                        onChange={(e) => setTitle(e.target.value)}
                        type="text" />
                    <input
                        value={content}
                        placeholder="Post Content"
                        onChange={(e) => setContent(e.target.value)}
                        type="text" />
                </div>

            </div>


            <div 
                className="logout"
                onClick={() => {handleLogout()}}>
                <p>Logout</p>
            </div>

        </div>
    )
}

export default LeftBar