const pool = require('../db/pool');

async function getAllComments() {
 const result = await pool.query('SELECT * FROM comments');
 return result.rows;
}

async function createComment(comment) {
 const result = await pool.query('INSERT INTO comments (content, author_id, post_id) VALUES ($1, $2, $3) RETURNING *', [comment.content, comment.author_id, comment.post_id]);
 const newComment = result.rows[0];
 return newComment;
}

module.exports = {
 getAllComments,
 createComment
};