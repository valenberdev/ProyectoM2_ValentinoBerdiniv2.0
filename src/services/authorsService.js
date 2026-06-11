const pool = require('../db/pool');

async function getAllAuthors() {
 const result = await pool.query('SELECT * FROM authors');
 return result.rows;
}

async function getAuthorById(id) {
 const result = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
 if (result.rows.length === 0) return null;
 return result.rows[0];
}

async function createAuthor(author) {
 const result = await pool.query('INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *', [author.name, author.email, author.bio]);
 const newAuthor = result.rows[0];
 return newAuthor;
}

async function updateAuthor(id, updatedInfo) {
  const result = await pool.query(
    'UPDATE authors SET name = COALESCE($1, name), email = COALESCE($2, email), bio = COALESCE($3, bio) WHERE id = $4 RETURNING *',
    [updatedInfo.name, updatedInfo.email, updatedInfo.bio, id]
  );
  if (result.rows.length === 0) return null;
  return result.rows[0];
}

async function deleteAuthor(id) {
 const result = await pool.query('DELETE FROM authors WHERE id = $1 RETURNING *', [id]);
 if (result.rows.length === 0) return null;
 return result.rows[0];
}



module.exports = {
 getAllAuthors,
 getAuthorById,
 createAuthor,
 updateAuthor,
 deleteAuthor
};