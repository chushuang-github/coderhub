const KoaRouter = require("@koa/router");
const userController = require("../controller/user.controller");
const { verifyUser, handlePassword } = require("../middleware/user.middleware");

const userRouter = new KoaRouter({ prefix: "/users" });

// 1.用户注册接口
userRouter.post("/", verifyUser, handlePassword, userController.create);

module.exports = userRouter;
