const { pool } = require("../dbconfig");
module.exports = class Post {
  constructor(title, city, description, author_id) {
    this.title = title;
    this.city = city;
    this.description = description;
    this.author_id = author_id;
  }

  save() {
    return pool.query(
      `INSERT INTO "post" ("title", "city", "description", "author_id") VALUES ($1, $2, $3, $4)`,
      [this.title, this.city, this.description, this.author_id],
      (err, results) => {
        if (err) {
          return {
            message: err,
          };
        }
        return;
      }
    );
  }
  static getAllPosts() {
    return pool.query(`select * from post`);
  }
  static getPosts() {
    return pool.query(
      `select p.title, p.city, c.post_id, p.description, p.author_id, p.approved, p.active, p.id, array_agg(c.candidate_id) as candidats from post p full join candidatepostrelation c on p.id = c.post_id group by p.id, c.post_id;`
    );
  }
  static getPostsConsultant() {
    return pool.query(
      `select p.title, p.city, c.post_id, p.description, p.approved, p.author_id, p.active, p.id, c.active as activeapply, c.candidate_id, u.firstname, u.lastname, u.enterprise, u.email, u.cv from post p full join candidatepostrelation c on p.id = c.post_id join users u on u.id = c.candidate_id;`
    );
  }
  static getPostsById(author_id) {
    return pool.query(
      `select p.title, p.city, c.post_id, p.description, p.approved, p.author_id, p.active, p.id, c.active as activeapply, c.candidate_id, u.firstname, u.lastname, u.email, u.cv from post p full join candidatepostrelation c on p.id = c.post_id join users u on u.id = c.candidate_id WHERE author_id = $1;`,
      [author_id]
    );
  }

  static getPostApplied() {
    return pool.query(`SELECT * FROM "candidatepostrelation"`);
  }
  static approvePost(id) {
    return pool.query(
      `UPDATE "post" SET  "active" = 'true' WHERE "id" = $1`,
      [id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("approved");
        }
      }
    );
  }
  static approvePostCandidate(candidate_id, post_id) {
    return pool.query(
      `UPDATE "candidatepostrelation" SET "active" = 'true' WHERE "candidate_id" = $1 and "post_id" = $2`,
      [candidate_id, post_id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("approved");
        }
      }
    );
  }
  static async findById(id) {
    return await pool.query(`SELECT * FROM "post" WHERE "id" = $1`, [id]);
  }
  static async deleteById(id) {
    pool.query(`DELETE FROM "candidatepostrelation" WHERE "post_id" = $1`, [
      id,
    ]);
    console.log("ok");
    return pool.query(`DELETE FROM "post" WHERE "id" = $1`, [id]);
  }
  static applyPost(user_id, post_id) {
    return pool.query(
      `INSERT INTO "candidatepostrelation" ("candidate_id", "post_id") VALUES ($1, $2)`,
      [user_id, post_id],
      (err, results) => {
        if (err) {
          return {
            message: err,
          };
        }
        return;
      }
    );
  }
  static findByAuthor_Id(author_id) {
    return pool.query(`SELECT * FROM "post" WHERE "author_id" = $1`, [
      author_id,
    ]);
  }
};
