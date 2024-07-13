const KoaRouter = require("@koa/router");
const labelController = require("../controller/label.controller");
const { verifyAuth } = require("../middleware/login.middleware");

const labelRouter = new KoaRouter({ prefix: "/label" });

// 1.新增标签
labelRouter.post("/", verifyAuth, labelController.create);

// 2.删除标签
labelRouter.delete("/:labelId", verifyAuth, labelController.remove);

// 3.查询标签列表
labelRouter.get("/list", labelController.list);

module.exports = labelRouter;
