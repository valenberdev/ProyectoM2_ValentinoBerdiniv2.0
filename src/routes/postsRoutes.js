const { Router } = require('express');
const router = Router();
const { getAllPosts, getPostById, getPostByAuthorId, createPost, updatePost, deletePost } = require("../services/postsService");

router.get('/', async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los posts' });
    }
});

router.get('/author/:author_id', async (req, res) => {
    const author_id = parseInt(req.params.author_id);
    try {
        const posts = await getPostByAuthorId(author_id);
        if (posts.length === 0) {
            return res.status(404).json({ message: 'No se encontraron posts para este autor' });
        }
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los posts del autor' });
    }
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const post = await getPostById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el post' });
    }
});

router.post('/', async (req, res) => {
    const { title, content, author_id, published } = req.body;
    try {
        if (!title || !content || !author_id) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }
        const newPost = await createPost({ title, content, author_id, published });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el post' });
    }
});

router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const updatedPost = await updatePost(id, req.body);
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }   
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el post' });
    }
});

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const deletedPost = await deletePost(id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        res.json({ message: 'Post eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el post' });
    }
});

module.exports = router;