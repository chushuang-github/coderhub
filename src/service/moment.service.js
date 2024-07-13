const connection = require("../app/database");

class MomentService {
  async create(content, userId) {
    // 1.拼接statement
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`;

    // 2.执行sql语句
    const [result] = await connection.execute(statement, [content, userId]);
    return result;
  }

  async queryList(offset = 0, size = 10) {
    const statement = `
      SELECT  
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT("id", u.id, "name", u.name, "createTime", u.createAt, "updateTime", u.updateAt) author,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount
      FROM moment m
      LEFT JOIN user u ON u.id = m.user_id
      LIMIT ? offset ?;
    `;
    const [result] = await connection.execute(statement, [
      String(size),
      String(offset),
    ]);
    return result;
  }

  async queryById(momentId) {
    const statement = `
      SELECT  
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT("id", u.id, "name", u.name, "createTime", u.createAt, "updateTime", u.updateAt) author,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "id", c.id, "content", c.content, "commentId", c.comment_id, "createTime", c.createAt, "updateTime", c.updateAt,
            "author", JSON_OBJECT("id", cu.id, "name", cu.name, "createTime", cu.createAt, "updateTime", cu.updateAt)
          )
        ) comments
      FROM moment m
      LEFT JOIN user u ON u.id = m.user_id
      LEFT JOIN comment c ON c.moment_id = m.id
      LEFT JOIN user cu ON cu.id = c.user_id
      GROUP BY m.id
      HAVING m.id = ?;
    `;

    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }

  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }

  async update(momentId, content) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [content, momentId]);
    return result;
  }
}

module.exports = new MomentService();
