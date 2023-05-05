router = require('express').Router();
const { Venue } = require('../../models');


router.get('/', async (req, res) => {
    try {
        const venueData = await Venue.findAll();
        res.staus(200).json(venueData);
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