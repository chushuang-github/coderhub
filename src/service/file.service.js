const connection = require("../app/database");

class FileService {
  async create(filename, mimetype, size, userId) {
    // 1.拼接statement
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);`;

    // 2.执行sql语句
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      userId,
    ]);
    return result;
  }

  async queryAvatarWithUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`;
    const [result] = await connection.execute(statement, [userId]);
    return result.pop();
  }
}

module.exports = new FileService();
