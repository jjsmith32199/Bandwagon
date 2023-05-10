const { Artist, Venue } = require('../models');

const resolvers = {
    Query: {
        artists: async () => {
            return await Artist.find({})
            .populate('genre')
            .populate({
                path: 'venue',
                populate: 'venue'
            });
        },
        venues: async () => {
            
            return await Venue.find({}).populate('venue');
        }
    }
};  

module.exports = resolvers;