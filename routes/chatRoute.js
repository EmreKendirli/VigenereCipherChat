import express  from "express";
import ChatController from "../controllers/chat/chatController.js";
import FormData from "../middlewares/FormDataMiddleware.js"
import Auth from "../middlewares/userAuthMiddleware.js"
const router =express.Router()

router.route("/send-message").post(Auth.authenticateUserAPIToken,FormData.uploadSetting,ChatController.sendMessage)
router.route("/message-list/:conversationId").get(Auth.authenticateUserAPIToken,ChatController.getmessagesBetweenUsersFor)
router.route("/user-list").get(Auth.authenticateUserAPIToken,ChatController.bringThePeopleITexted)
export default router
