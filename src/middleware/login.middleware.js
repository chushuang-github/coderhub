const jwt = require("jsonwebtoken");
const userService = require("../service/user.service");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UN_AUTHORIZATION,
} = require("../config/error");
const { PUBLIC_KEY } = require("../config/secret");
const md5Password = require("../utils/md5-password");

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;

  // 1.判断用户名和密码是否为空
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }

  // 2.查询该用户是否在数据库中
  const users = await userService.findUserByName(name);
  const user = users[0];
  if (!user) {
    return ctx.app.emit("error", NAME_IS_NOT_EXISTS, ctx);
  }

  // 3.查询用户密码是否正确
  if (md5Password(password) !== user.password) {
    return ctx.app.emit("error", PASSWORD_IS_INCORRENT, ctx);
  }

  // 4.将user对象保存在ctx里面
  ctx.user = user;

  // 5.执行下一个中间件
  await next();
};

const verifyAuth = async (ctx, next) => {
  // 1.获取token
  const authorization = ctx.header.authorization;
  const token = authorization?.replace("Bearer ", "");

  // 2.验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, { algorithms: ["RS256"] });

    // 3.将token的信息保存下来
    ctx.user = result;

    // 4.执行下一个中间件
    await next();
  } catch (err) {
    ctx.app.emit("error", UN_AUTHORIZATION, ctx);
  }
};

module.exports = {
  verifyLogin,
  verifyAuth,
};
