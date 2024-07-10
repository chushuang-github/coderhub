const momentService = require("../service/moment.service");

class MomentController {
  async create(ctx, next) {
    // 1.获取动态内容
    const { content } = ctx.request.body;

    // 2.动态由谁发布
    const { id } = ctx.user;

    // 3.将动态数据保存到数据库中
    const result = await momentService.create(content, id);

    // 4.告知前端是否添加动态成功
    ctx.body = {
      code: 0,
      message: "创建动态成功~",
      data: result,
    };
  }

  async list(ctx, next) {
    const { offset, size } = ctx.query;
    const result = await momentService.queryList(offset, size);
    ctx.body = {
      code: 0,
      data: result,
    };
  }

  async detail(ctx, next) {
    const { momentId } = ctx.params;
    const result = await momentService.queryById(momentId);
    ctx.body = {
      code: 0,
      data: result[0],
    };
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params;
    const result = await momentService.remove(momentId);
    ctx.body = {
      code: 0,
      message: "删除动态成功~",
      data: result,
    };
  }

  async update(ctx, next) {
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await momentService.update(momentId, content);
    ctx.body = {
      code: 0,
      message: "修改动态成功~",
      data: result,
    };
  }
}

module.exports = new MomentController();
