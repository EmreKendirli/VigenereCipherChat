import express  from "express"
import User from "../controllers/userController.js"
import FormData from "../middlewares/FormDataMiddleware.js"
import Auth from "../middlewares/userAuthMiddleware.js"
const router = express.Router()

router.route("/register").post(FormData.uploadSetting,User.userRegister)
router.route("/login").post(FormData.uploadSetting,User.userLogin)

export default router
