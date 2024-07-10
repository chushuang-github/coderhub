const KoaRouter = require("@koa/router");
const momentController = require("../controller/moment.controller");
const { verifyAuth } = require("../middleware/login.middleware");
const {
  verifyMomentPermission,
} = require("../middleware/permission.middleware");

const momentRouter = new KoaRouter({ prefix: "/moment" });

// 1.创建动态接口
momentRouter.post("/", verifyAuth, momentController.create);

// 2.查询动态接口
momentRouter.get("/", momentController.list);

// 3.获取某一个动态的详情
momentRouter.get("/:momentId", momentController.detail);

// 4.删除动态
momentRouter.delete(
  "/:momentId",
  verifyAuth,
  verifyMomentPermission,
  momentController.remove
);

// 5.修改动态
momentRouter.patch(
  "/:momentId",
  verifyAuth,
  verifyMomentPermission,
  momentController.update
);

module.exports = momentRouter;
