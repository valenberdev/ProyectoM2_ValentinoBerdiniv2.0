const { Router } = require("express");
const router = Router();
const { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = require("../services/authorsService");


router.get('/', async (req, res) => {
  try {
    const authors = await getAllAuthors();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los autores' });
  }
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const author = await getAuthorById(id);
    if (!author) {
      return res.status(404).json({ message: 'Autor no encontrado' });
    }
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el autor' });
  }
});

router.post('/', async (req, res) => {
  const { name, email, bio } = req.body;
  try {
    if (!name || !email || !bio) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }
    const newAuthor = await createAuthor({ name, email, bio });
    res.status(201).json(newAuthor);
    } catch (error) {
      if (error.code === '23505') {
        return res.status(400).json({ message: 'El mail ya está registrado' });
      }
    res.status(500).json({ message: 'Error al crear el autor' });
  }
});

router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const updatedAuthor = await updateAuthor(id, req.body);
        if (!updatedAuthor) {
            return res.status(404).json({ message: 'Autor no encontrado' });
        }
        res.json(updatedAuthor);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el autor' });
    }
});

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const deletedAuthor = await deleteAuthor(id);
        if (!deletedAuthor) {
            return res.status(404).json({ message: 'Autor no encontrado' });
        }
        res.json({ message: 'Autor eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el autor' });
    }
});

module.exports = router;