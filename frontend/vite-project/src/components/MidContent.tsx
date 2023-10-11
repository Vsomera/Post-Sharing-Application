import { useContext } from "react"
import { PostContext } from "../context/postsContext"

const MidContent = () => {


    const { posts } = useContext(PostContext)

    return (
        <div className="mid">
            {posts.map((post) => (
                <div key={post.postID}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <p>Posted on: {post.postDate}</p>
                </div>
            ))}
        </div>
    )
}

export default MidContent