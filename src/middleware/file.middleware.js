const multer = require("@koa/multer");
const { UPLOAD_PATH } = require("../config/path");

// 定义头像上传中间件
const uploadAvatar = multer({
  dest: UPLOAD_PATH,
});

const handleAvatar = uploadAvatar.single("avatar");

module.exports = {
  handleAvatar,
};
