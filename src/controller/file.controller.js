const fileService = require("../service/file.service");
const userService = require("../service/user.service");
const { SERVER_PORT, SERVER_HOST } = require("../config/server");

class FileController {
  async create(ctx, next) {
    const { id } = ctx.user;
    const { filename, mimetype, size } = ctx.request.file;

    // 操作数据库
    const result = await fileService.create(filename, mimetype, size, id);

    // 将头像地址信息保存在user表中
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`;
    await userService.updateUserAvatar(avatarUrl, id);

    ctx.body = {
      code: 0,
      message: "头像上传成功~",
      data: result,
    };
  }
}

module.exports = new FileController();
