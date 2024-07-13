const KoaRouter = require("@koa/router");
const commentController = require("../controller/comment.controller");
const { verifyAuth } = require("../middleware/login.middleware");
const { verifyPermission } = require("../middleware/permission.middleware");

const commentRouter = new KoaRouter({ prefix: "/comment" });

// 1.新增评论
commentRouter.post("/", verifyAuth, commentController.create);

// 2.回复评论
commentRouter.post("/reply", verifyAuth, commentController.reply);

// 3.删除评论
commentRouter.delete(
  "/:commentId",
  verifyAuth,
  verifyPermission,
  commentController.remove
);

module.exports = commentRouter;
