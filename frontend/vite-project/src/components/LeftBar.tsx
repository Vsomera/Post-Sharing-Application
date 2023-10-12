import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { PostContext } from "../context/postsContext";
import { addPostDB } from "../services/analyticsService";
import { userInfo } from "../services/authService";
import { logOut } from "../services/authService";
import { AnalyticsContext } from "../context/analyticsContext";

const LeftBar = () => {
    const { user, setUser } = useContext(UserContext);
    const { yourPosts, postCount, updatePostCount, updateYourPosts } = useContext(AnalyticsContext)!
    const { addPost } = useContext(PostContext);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    const handleAdd = async () => {
        // adds a new post
        const userID = await userInfo(user?.accessToken || "");
        const currDate = new Date();
        const formattedDate = currDate.toUTCString();

        const uuid = generateUUID()

        const newPost = {
            postID: parseInt(uuid, 16),
            title: title,
            content: content,
            postDate: formattedDate,
            userID: userID._id,
        };

        addPost(newPost);
        addPostDB(user?.accessToken || "", title, content);

        setTitle("");
        setContent("");

        updatePostCount(postCount + 1)
        updateYourPosts(yourPosts + 1)
    };

    const generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      }

    const handleLogout = async () => {
        setUser(null);
        logOut();
        navigate("/register");
    };

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
                        type="text"
                    />
                    <input
                        value={content}
                        placeholder="Post Content"
                        onChange={(e) => setContent(e.target.value)}
                        type="text"
                    />
                </div>
            </div>

            <div className="logout" onClick={() => { handleLogout() }}>
                <p>Logout</p>
            </div>
        </div>
    );
};

export default LeftBar;
