let authors = [
 {
   id: 1,
   name: 'Ana García',
   email: 'ana@example.com',
   bio: 'Desarrolladora full-stack apasionada por Node.js'
 },
 {
   id: 2,
   name: 'Carlos Ruiz',
   email: 'carlos@example.com',
   bio: 'Escritor técnico especializado en bases de datos'
 },
 {
   id: 3,
   name: 'María López',
   email: 'maria@example.com',
   bio: 'Ingeniera de software con foco en APIs REST'
 }
];

function getAllAuthors() {
 return authors;
}

function getAuthorById(id) {
 return authors.find(author => parseInt(author.id) === parseInt(id));
}

function createAuthor(author) {
 const newAuthor = { id: authors.length + 1, ...author };
 authors.push(newAuthor);
 return newAuthor;
}

function updateAuthor(id, updatedInfo) {
 const authorIndex = authors.findIndex(author => parseInt(author.id) === parseInt(id));
 if (authorIndex === -1) return null;
 authors[authorIndex] = { ...authors[authorIndex], ...updatedInfo };
 return authors[authorIndex];
}

function deleteAuthor(id) {
 const authorIndex = authors.findIndex(author => parseInt(author.id) === parseInt(id));
 if (authorIndex === -1) return null;
 return authors.splice(authorIndex, 1)[0];
}


module.exports = {
 getAllAuthors,
 getAuthorById,
 createAuthor,
 updateAuthor,
 deleteAuthor
};