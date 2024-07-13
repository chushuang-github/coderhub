const KoaRouter = require("@koa/router");
const userController = require("../controller/user.controller");
const { verifyUser, handlePassword } = require("../middleware/user.middleware");

const userRouter = new KoaRouter({ prefix: "/users" });

// 1.用户注册接口
userRouter.post("/", verifyUser, handlePassword, userController.create);

// 2.根据用户id查询用户头像
userRouter.get("/avatar/:userId", userController.showAvatarImage);

module.exports = userRouter;
