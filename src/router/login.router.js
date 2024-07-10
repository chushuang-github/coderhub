const KoaRouter = require("@koa/router");
const loginController = require("../controller/login.controller");
const { verifyLogin, verifyAuth } = require("../middleware/login.middleware");

const loginRouter = new KoaRouter({ prefix: "/login" });

// 1.用户登录接口
loginRouter.post("/", verifyLogin, loginController.sign);

// 2.测试登录授权接口
loginRouter.get("/test", verifyAuth, loginController.test);

module.exports = loginRouter;
