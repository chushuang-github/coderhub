const connection = require("../app/database");

class LabelService {
  async create(name) {
    // 1.拼接statement
    const statement = `INSERT INTO label (name) VALUES (?);`;

    // 2.执行sql语句
    const [result] = await connection.execute(statement, [name]);
    return result;
  }

  async remove(labelId) {
    const statement = `DELETE FROM label WHERE id = ?;`;
    const [result] = await connection.execute(statement, [labelId]);
    return result;
  }

  async list() {
    const statement = `SELECT id, name FROM label ORDER BY id ASC;`;
    const [result] = await connection.execute(statement);
    return result;
  }

  // 判断标签是否在label数据库表中
  async queryLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?;`;
    const [result] = await connection.execute(statement, [name]);
    return result[0];
  }
}

module.exports = new LabelService();
