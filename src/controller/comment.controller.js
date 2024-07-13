const commentService = require("../service/comment.service");

class CommentController {
  async create(ctx, next) {
    // 1.获取body中参数
    const { content, momentId } = ctx.request.body;
    const { id } = ctx.user;

    // 2.操作数据库存储数据
    const result = await commentService.create(content, momentId, id);

    ctx.body = {
      code: 0,
      message: "发表评论成功~",
      data: result,
    };
  }

  async reply(ctx, next) {
    // 1.获取body中参数
    const { content, momentId, commentId } = ctx.request.body;
    const { id } = ctx.user;

    // 2.操作数据库存储数据
    const result = await commentService.reply(content, momentId, commentId, id);

    ctx.body = {
      code: 0,
      message: "回复评论成功~",
      data: result,
    };
  }

  async remove(ctx, next) {
    const { commentId } = ctx.params;
    const result = await commentService.remove(commentId);
    ctx.body = {
      code: 0,
      message: "删除评论成功~",
      data: result,
    };
  }
}

module.exports = new CommentController();
