import express  from "express"
import User from "../controllers/userController.js"
import FormData from "../middlewares/FormDataMiddleware.js"
import FromData2 from "../middlewares/fileFormDataMiddleware.js"
import Auth from "../middlewares/userAuthMiddleware.js"
const router = express.Router()

router.route("/register").post(FormData.uploadSetting,User.userRegister)
router.route("/login").post(FormData.uploadSetting,User.userLogin)
router.route("/text").post(FormData.uploadSetting,User.data)
router.route("/file").post(FromData2.uploadSettingImages,FromData2.resizeImages,User.data2)

export default router
