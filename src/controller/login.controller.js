const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../config/secret");

class LoginController {
  async sign(ctx, next) {
    // 1.获取用户信息
    const { id, name } = ctx.user;

    // 2.颁发token令牌
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: "RS256",
    });

    // 3.告知前端是否登录成功
    ctx.body = {
      code: 0,
      message: "登录成功~",
      data: {
        token,
        id,
        name,
      },
    };
  }

  async test(ctx) {
    ctx.body = {
      code: 0,
      message: "可以访问test接口~",
    };
  }
}

module.exports = new LoginController();
