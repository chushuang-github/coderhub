const fs = require("fs");
const userService = require("../service/user.service");
const fileService = require("../service/file.service");
const { UPLOAD_PATH } = require("../config/path");

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

  async showAvatarImage(ctx, next) {
    // 1.获取用户id
    const { userId } = ctx.params;

    // 2.获取userId对应的头像信息
    const avatarInfo = await fileService.queryAvatarWithUserId(userId);

    // 3.读取头像所在的文件信息
    const { filename, mimetype } = avatarInfo;

    // 如果不设置响应头，浏览器会下载这张图片；设置了响应头，浏览器就是打开这张图片
    // 下面两种方式都是ok的
    // ctx.response.set("content-type", mimetype);
    ctx.type = mimetype;

    // 返回一张图片的时候，直接返回一个流就可以了 (返回一个buffer也可以)
    // 我自己测试，使用fs.readFileSync返回一个buffer也是可以的
    // UPLOAD_PATH = "./uploads"
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`);
  }
}

module.exports = new UserController();
