const pool = require('../db/pool');

async function getAllPosts() {
 const result = await pool.query('SELECT * FROM posts');
 return result.rows;
}

async function getPostByAuthorId(author_id) {
 const result = await pool.query('SELECT * FROM posts WHERE author_id = $1', [author_id]);
 return result.rows;
}


async function getPostById(id) {
 const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
 if (result.rows.length === 0) return null;
 return result.rows[0];
}

async function createPost(post) {
 const result = await pool.query('INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING *', [post.title, post.content, post.author_id, post.published]);
 const newPost = result.rows[0];
 return newPost;
}

async function updatePost(id, updatedInfo) {
 const result = await pool.query(
   'UPDATE posts SET author_id = COALESCE($1, author_id), title = COALESCE($2, title), content = COALESCE($3, content), published = COALESCE($4, published) WHERE id = $5 RETURNING *',
   [updatedInfo.author_id, updatedInfo.title, updatedInfo.content, updatedInfo.published, id]
 );
 if (result.rows.length === 0) return null;
 return result.rows[0];
}

async function deletePost(id) {
 const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
 if (result.rows.length === 0) return null;
 return result.rows[0];
}

module.exports = {
 getAllPosts,
 getPostByAuthorId,
 getPostById,
 createPost,
 updatePost,
 deletePost
};