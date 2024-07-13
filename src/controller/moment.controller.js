const momentService = require("../service/moment.service");
const { MOMENT_ADD_LABEL_ERROR } = require("../config/error");

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
    // const result = await momentService.queryById(momentId);
    const result = await momentService.queryByIdOptimize(momentId);
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

  async addLabels(ctx, next) {
    // 1.获取参数
    const { labels } = ctx;
    const { momentId } = ctx.params;

    // 2.将moment_id和label_id，添加到moment_label关系表中
    try {
      for (const label of labels) {
        // 2.1判断label_id和moment_id，是否已经存在moment_label关系表中
        const isExists = await momentService.hasLabel(momentId, label.id);
        if (!isExists) {
          await momentService.addLabel(momentId, label.id);
        }
      }

      ctx.body = {
        code: 0,
        message: "动态添加标签成功~",
      };
    } catch (error) {
      ctx.app.emit("error", MOMENT_ADD_LABEL_ERROR, ctx);
    }
  }
}

module.exports = new MomentController();
