import express from "express"
import userController from "../controllers/userController"
const router = express.Router()

// @ desc   Register User
// @ route  POST /api/users/
// @ access Public

router.post("/", userController.registerUser)

// @ desc   Login User
// @ route  POST /api/users/login
// @ access Public

router.post("/login", userController.loginUser)

// @ desc   User Info
// @ route  GET /api/users/me
// @ access Private

router.get("/", (req, res) => {
    res.status(200).json({
        message: "fetch user data"
    })
})

module.exports = router