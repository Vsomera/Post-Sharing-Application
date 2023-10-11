import React, { useState, useEffect } from "react";

interface Post {
    postID: number;
    title: string;
    content: string;
    postDate: string;
    userID: string;
  }
  
  interface PostContextType {
    posts: Post[];
    addPost: (post: Post) => void;
    removePost: (postId: number) => void;
  }

  export const PostContext = React.createContext<PostContextType>({
    posts: [],
    addPost: () => {},
    removePost: () => {},
  });

  export const PostContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([]);
  
    const addPost = (post: Post) => {
      setPosts([...posts, post]);
    };
  
    const removePost = (postId: number) => {
      const updatedPosts = posts.filter((post) => post.postID !== postId);
      setPosts(updatedPosts);
    };
  
    useEffect(() => {
      // Fetch posts from the API
      const fetchPosts = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/get-posts");
          if (response.ok) {
            const data = await response.json();
            setPosts(data);
          } else {
            console.error("Failed to fetch posts");
          }
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };
  
      fetchPosts(); // Call the function to fetch posts when the component mounts
  
      // You can set up a timer or other triggers to periodically fetch posts
      // to keep the posts data up-to-date.
  
      // Cleanup: You can return a cleanup function if necessary
    }, []);
  
    return (
      <PostContext.Provider value={{ posts, addPost, removePost }}>
        {children}
      </PostContext.Provider>
    );
  };