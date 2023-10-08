import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import User from "../models/userModels"
import hashMiddleware from "../middleware/hashMiddleware"

const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body

        // checks if a user already exists in database
        const checkEmail = await User.findOne({ email: email })
        if (checkEmail) {
            return res.status(400).json({
                message: "Could not register User",
                error: "User already exists"
            })
        }

        // hashes user password before storing into the database
        const hashedPassword = await hashMiddleware.hashPassword(password)

        // adds user to database
        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        })

        // send confirmation user has been registered
        if (user) {
            return res.status(201).json({
                message: "User added to database"
            })
        }

    } catch (err) {
        return res.status(400).json({
            message: "Could not register User",
            err
        })
    }
}


export default {
    registerUser
}