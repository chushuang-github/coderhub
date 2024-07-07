const userService = require("../service/user.service");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
} = require("../config/error");
const md5Password = require("../utils/md5-password");

// 验证用户名名和密码
const verifyUser = async (ctx, next) => {
  // 1.验证客户端传递过来的user是否可以保存到数据库中
  // 1.1验证用户名和密码是否为空
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }

  // 1.2判断name是否在数据库中已经存在
  const users = await userService.findUserByName(name);
  if (users.length) {
    return ctx.app.emit("error", NAME_IS_ALREADY_EXISTS, ctx);
  }

  // 1.3执行下一个中间件
  await next();
};

// 密码加密
const handlePassword = async (ctx, next) => {
  // 1.取出密码
  const { password } = ctx.request.body;

  // 2.对密码进行加密
  ctx.request.body.password = md5Password(password);

  // 3执行下一个中间件
  await next();
};

module.exports = {
  verifyUser,
  handlePassword,
};
