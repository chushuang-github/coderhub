const KoaRouter = require("@koa/router");
const fileController = require("../controller/file.controller");
const { verifyAuth } = require("../middleware/login.middleware");
const { handleAvatar } = require("../middleware/file.middleware");

const fileRouter = new KoaRouter({ prefix: "/file" });

// 1.上传头像
fileRouter.post("/avatar", verifyAuth, handleAvatar, fileController.create);

module.exports = fileRouter;
