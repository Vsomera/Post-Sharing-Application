import { Schema } from "mongoose"
import mongoose from "mongoose"

interface userSchema {
    username: string
    email: string
    password: string
}

const userSchema = new Schema<userSchema>({
    username: {
        type: String,
        required: [true, "Please Enter a Name"]
    },
    email: {
        type: String,
        required: [true, "Please Enter an Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter a Password"]
    }
}, { timestamps: true })

const collection = "users"
export default mongoose.model("User", userSchema, collection)
