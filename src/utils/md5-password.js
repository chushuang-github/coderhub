// node中的核心模块crypto：加密用的
const crypto = require("crypto");

function md5Password(password) {
  const md5 = crypto.createHash("md5");
  // update方法进行加密；digest进行获取加密后的数据
  // 传入hex表示获取的结果是十六进制的，用字符串表示
  // 用户登录的时候，需要对密码进行同样的方法加密之后，和数据库中的密码比对
  const mdtPwd = md5.update(password).digest("hex");

  return mdtPwd;
}

module.exports = md5Password;
