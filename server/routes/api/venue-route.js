const router = require('express').Router();
const { Venue } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const venueData = await Venue.findAll();
        res.status(200).json(venueData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const venueData = await Venue.findByPk(req.params.id);
        if (!venueData) {
            res.status(404).json({ message: 'No venue found with this id!' });
            return;
        }
        res.status(200).json(venueData);
    } catch (err){
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newVenue = await Venue.create(req.body);
        res.status(201).json(newVenue);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedVenue = await Venue.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        if (!updatedVenue[0]) {
            res.status(404).json({ message: 'No venue found with this id!' });
            return;
        }
        res.status(200).json(updatedVenue);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedVenue = await Venue.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!deletedVenue) {
            res.status(404).json({ message: 'No venue found with this id!' });
            return;
        }
        res.status(200).json(deletedVenue);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
