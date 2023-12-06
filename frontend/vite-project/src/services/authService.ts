import axios from "axios";

export const registerUser = async (username: string, email: string, password: string) => {
    // registers user into database
    try {
        const userData = {
            username,
            email,
            password
        }
        const newUser = await axios.post(`${import.meta.env.VITE_AUTH_URI}/api/users`, userData)
        return newUser.status
    } catch (err) {
        return err
    }
}

export const loginUser = async (email: string, password: string) => {
    try {
        const verifyUser = await axios.post(`${import.meta.env.VITE_AUTH_URI}/api/users/login`, {
            email: email,
            password: password
        })

        if (verifyUser.status == 201) {
            return { "accessToken": verifyUser.data.accessToken }
        }
        return null // Return null if the status is not 201
    } catch (err) {
        return err;
    }
}

export const userInfo = async (accessToken: string) => {
    // gets user info from accessToken
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
    const userData = await axios.get(`${import.meta.env.VITE_AUTH_URI}/api/users/`, config) // returns user information

    return userData.data.user
}

export const logOut = () => {
    localStorage.removeItem("user")
    return null
}


