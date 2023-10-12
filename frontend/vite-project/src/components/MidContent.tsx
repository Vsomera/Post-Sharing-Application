import { useContext } from "react"
import { PostContext } from "../context/postsContext"

const MidContent = () => {


    const { posts } = useContext(PostContext)

    return (
        <div className="mid">

            {posts.map((post) => (
                <div   
                    className="post" 
                    key={post.postID}>
                    <h2>{post.title}</h2>
                    <br />
                    <p>{post.content}</p>
                    <p>Posted on: {post.postDate}</p>
                </div>
            ))}

        </div>
    )
}

export default MidContent