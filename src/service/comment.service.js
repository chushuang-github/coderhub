const connection = require("../app/database");

class CommentService {
  async create(content, momentId, userId) {
    // 1.拼接statement
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`;

    // 2.执行sql语句
    const [result] = await connection.execute(statement, [
      content,
      momentId,
      userId,
    ]);
    return result;
  }

  async reply(content, momentId, commentId, userId) {
    // 1.拼接statement
    const statement = `INSERT INTO comment (content, moment_id, comment_id, user_id) VALUES (?, ?, ?, ?);`;

    // 2.执行sql语句
    const [result] = await connection.execute(statement, [
      content,
      momentId,
      commentId,
      userId,
    ]);
    return result;
  }

  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?;`;
    const [result] = await connection.execute(statement, [commentId]);
    return result;
  }
}

module.exports = new CommentService();
