import mongoose from "mongoose";

const connectDB = async () => {
    // connects to mongoDB database
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log(`Database Connected : ${conn.connection.host}`)
    } catch (err) {
        console.log(err)
        process.exit(1) // exits connection with failure if credentials are invalid
    }
}

export default connectDB