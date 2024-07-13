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
        JSON_OBJECT("id", u.id, "name", u.name, "avatarUrl", u.avatar_url, "createTime", u.createAt, "updateTime", u.updateAt) author,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
        (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
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

  // 根据id查询动态详情（有缺陷版本，动态评论）
  async queryById(momentId) {
    const statement = `
      SELECT  
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT("id", u.id, "name", u.name, "avatarUrl", u.avatar_url, "createTime", u.createAt, "updateTime", u.updateAt) author,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "id", c.id, "content", c.content, "commentId", c.comment_id, "createTime", c.createAt, "updateTime", c.updateAt,
            "author", JSON_OBJECT("id", cu.id, "name", cu.name, "avatarUrl", cu.avatar_url, "createTime", cu.createAt, "updateTime", cu.updateAt)
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

  // 根据id查询动态详情（优化版本，动态评论 + 动态标签）
  async queryByIdOptimize(momentId) {
    const statement = `
      SELECT  
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT("id", u.id, "name", u.name, "avatarUrl", u.avatar_url, "createTime", u.createAt, "updateTime", u.updateAt) author,
        IF(COUNT(l.id), JSON_ARRAYAGG(
          JSON_OBJECT("id", l.id, "name", l.name)
        ), NULL) labels,
        (SELECT
          IF(COUNT(c.id), JSON_ARRAYAGG(
            JSON_OBJECT(
              "id", c.id, "content", c.content, "commentId", c.comment_id, "createTime", c.createAt, "updateTime", c.updateAt,
              "author", JSON_OBJECT("id", cu.id, "name", cu.name, "avatarUrl", cu.avatar_url, "createTime", cu.createAt, "updateTime", cu.updateAt)
            )
          ), NULL)
          FROM comment c
          LEFT JOIN user cu ON c.user_id = cu.id
          WHERE m.id = c.moment_id
        ) comments
      FROM moment m
      LEFT JOIN user u ON u.id = m.user_id
      LEFT JOIN moment_label ml ON ml.moment_id = m.id
      LEFT JOIN label l ON l.id = ml.label_id
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

  // 查询label_id和moment_id，是否已经存在moment_label关系表中
  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return !!result.length;
  }

  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result;
  }
}

module.exports = new MomentService();
