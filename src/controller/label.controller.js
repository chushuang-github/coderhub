const labelService = require("../service/label.service");

class LabelController {
  async create(ctx, next) {
    // 1.获取body中参数
    const { name } = ctx.request.body;

    // 2.操作数据库存储数据
    const result = await labelService.create(name);

    ctx.body = {
      code: 0,
      message: "创建标签成功~",
      data: result,
    };
  }

  async remove(ctx, next) {
    const { labelId } = ctx.params;
    const result = await labelService.remove(labelId);
    ctx.body = {
      code: 0,
      message: "删除标签成功~",
      data: result,
    };
  }

  async list(ctx, next) {
    const result = await labelService.list();
    ctx.body = {
      code: 0,
      message: "查询列表成功~",
      data: result,
    };
  }
}

module.exports = new LabelController();
