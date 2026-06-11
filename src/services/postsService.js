let posts = [
 {
   id: 1,
   title: 'Introducción a Node.js',
   content: 'Node.js es un runtime de JavaScript...',
   author_id: 1,
   published: true
 },
 {
   id: 2,
   title: 'PostgreSQL vs MySQL',
   content: 'Ambas bases de datos tienen ventajas...',
   author_id: 2,
   published: true
 },
 {
   id: 3,
   title: 'APIs RESTful',
   content: 'REST es un estilo arquitectónico...',
   author_id: 1,
   published: true
 },
 {
   id: 4,
   title: 'Manejo de errores en Express',
   content: 'El manejo apropiado de errores...',
   author_id: 3,
   published: false
 },
 {
   id: 5,
   title: 'Async/Await explicado',
   content: 'Las promesas simplifican el código asíncrono...',
   author_id: 3,
   published: false
 }
];

function getAllPosts() {
 return posts;
}

function getPostByAuthorId(author_id) {
 return posts.filter(post => parseInt(post.author_id) === parseInt(author_id));
}

function getPostById(id) {
 return posts.find(post => parseInt(post.id) === parseInt(id));
}

function createPost(post) {
 const newPost = { id: posts.length + 1, ...post };
 posts.push(newPost);
 return newPost;
}

function updatePost(id, updatedInfo) {
 const postIndex = posts.findIndex(post => parseInt(post.id) === parseInt(id));
 if (postIndex === -1) return null;
 posts[postIndex] = { ...posts[postIndex], ...updatedInfo };
 return posts[postIndex];
}

function deletePost(id) {
 const postIndex = posts.findIndex(post => parseInt(post.id) === parseInt(id));
 if (postIndex === -1) return null;
 return posts.splice(postIndex, 1)[0];
}

module.exports = {
 getAllPosts,
 getPostByAuthorId,
 getPostById,
 createPost,
 updatePost,
 deletePost
};