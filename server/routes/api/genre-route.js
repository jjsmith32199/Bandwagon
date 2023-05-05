const router = require('express').Router();
const { Genre } = require('../../models');

// The `/api/genres` endpoint
router.get('/', async (req, res) => {
    try{
        const genreData = await Genre.findAll();
        res.status(200).json(genreData);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.get(':id', async (req, res) => {
    try {
        const genreData = await Genre.findByPk(req.params.id);
        if (!genreData) {
            res.status(404).json({ message: 'No genre found with this id!' });
            return;
        }
        res.status(200).json(genreData);
    } catch (err) {
        res.status(500).json(err);
    }
});