const { Router } = require('express');
const router = Router();
const { getAllComments, createComment } = require('../services/commentsService');

router.get('/', async (req, res) => {
    try {
        const comments = await getAllComments();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los comentarios' });
    }
});

router.post('/', async (req, res) => {
    const { content, author_id, post_id } = req.body;
    try {
        if (!content || !author_id || !post_id) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }
        const newComment = await createComment({ content, author_id, post_id });
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el comentario' });
    }
});

module.exports = router;