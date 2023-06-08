const { pool } = require("../dbconfig");
module.exports = class User {
  constructor(
    firstname = "",
    lastname = "",
    enterprise = "",
    address = "",
    cv = "",
    role = "none"
  ) {
    (this.firstname = firstname),
      (this.lastname = lastname),
      (this.enterprise = enterprise),
      (this.address = address),
      (this.cv = cv),
      (this.role = role);
  }

  save() {
    return pool.query(
      `INSERT INTO "users" ("firstname", "lastname", "enterprise", "address", "cv", "role") VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        this.firstname,
        this.lastname,
        this.enterprise,
        this.address,
        this.cv,
        this.role,
      ],
      (err, results) => {
        console.log("ok : ", results);
      }
    );
  }

  static deleteById(id) {}
  static approveUser(id) {
    return pool.query(
      `UPDATE "users" SET  "active" = 'true' WHERE "id" = $1`,
      [id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("updated !");
        }
      }
    );
  }
  static uploadPdf(id, pdf) {
    return pool.query(
      `UPDATE "users" SET  "cv" = $1 WHERE "id" = $2`,
      [pdf, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("uploaded !");
        }
      }
    );
  }
  static updateUser(id, firstname, lastname, enterprise, address) {
    return pool.query(
      `UPDATE "users" SET  "firstname" = $2, "lastname"= $3, "enterprise" = $4, "address" = $5  WHERE "id" = $1`,
      [id, firstname, lastname, enterprise, address],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("updated !");
        }
      }
    );
  }
  static fetchAll() {
    return pool.query(`SELECT * FROM users`);
  }
  static fetchInactive() {
    return pool.query(`SELECT * FROM users where "active" = false`);
  }
  static findById(id) {
    return pool.query(`SELECT * FROM "users" WHERE "id" = $1`, [id]);
  }
  static findByEmail(email) {
    return pool.query(`SELECT * FROM "users" WHERE "email" = $1`, [email]);
  }
};
