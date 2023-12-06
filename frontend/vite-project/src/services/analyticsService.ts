import axios from "axios"
import { userInfo } from "./authService"
import { toast } from "react-toastify"

export const addPostDB = async (userToken: string, title: string, content: string) => {

    try {
        const verifyUser = await userInfo(userToken)

        const reqData = {
            userID: `${verifyUser._id}`,
            title,
            content
        }

        const newPost = await axios.post(`${import.meta.env.VITE_ANALYTICS_URI}/api/add-post`, reqData)

        if (newPost.status == 201) {
            return toast.success("New Post Added")
        }
    } catch (err) {
        console.log(err)
    }
}

export const getAnalytics = async (userToken : string) => {
    try {
        const reqData = {
            userID : userToken
        }
        const analytics = await axios.post(`${import.meta.env.VITE_ANALYTICS_URI}/api/user-statistics`, reqData)
        return analytics

    } catch (err) {
        console.log(err)
    }
}