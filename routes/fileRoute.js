import express  from "express"
import FormData from "../middlewares/FormDataMiddleware.js"
import FromData2 from "../middlewares/fileFormDataMiddleware.js"
import Auth from "../middlewares/userAuthMiddleware.js"
import File from "../controllers/fileController.js"
import ImageFormData from "../middlewares/imageFormDataMiddleware.js"
const router = express.Router()

// router.route("/text").post(FormData.uploadSetting,File.data)
router.use(Auth.authenticateUserAPIToken)
router.route("/file-encrption").post(FromData2.uploadSettingImages,FromData2.resizeImages,File.fileEncrption)
router.route("/image-encrption").post(ImageFormData.uploadSettingImages,ImageFormData.resizeImages,File.imageEncrption)
router.route("/file-decrypt/:id").post(FromData2.uploadSettingImages,File.fileDecrypt)
router.route("/image-decrypt/:id").post(ImageFormData.uploadSettingImages,File.imageDecrypt)

export default router
