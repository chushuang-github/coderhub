const userService = require("../service/user.service");

class UserController {
  async create(ctx, next) {
    // 1.获取用户传递过来的信息
    const user = ctx.request.body;

    // 2.将user用户信息存储到数据库
    const result = await userService.create(user);

    // 3.查看存储的结果，告知前端是否创建成功
    ctx.body = {
      code: 0,
      message: "创建用户成功~",
      data: result,
    };
  }
}

module.exports = new UserController();
