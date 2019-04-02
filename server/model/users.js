import pool from './db';

class model{
  static signup(firstname, lastname, address, phone, dob, gender, password, callback) {
    const queryText = `INSERT INTO users(firstname, lastname, address, phone, dob, gender, password) VALUES('${firstname}', '${lastname}', '${address}', '${phone}', '${dob}', '${gender}', '${password}') RETURNING *`;

    pool
      .query(queryText)
      .then(data => callback({ success: true, data: data.rows[0] }))
      .catch(err => callback({ success: false, data: err }));
    
    return null;
  }

  static login(phone, callback) {
    const queryText = `SELECT * FROM users WHERE phone='${phone}'`;

    pool
      .query(queryText)
      .then(data => callback({ success: true, data: data.rows[0] }))
      .catch(err => callback({ success: false, data: err.message }));
    
    return null;
  }
}
export default model;