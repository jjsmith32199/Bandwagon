const { Artist, Venue } = require('../../../models');

const resolvers = {
    Query: {
        artists: async () => {
            const artists = await Artist.find({})
            .populate('genre')
            .populate({
                path: 'venue',
                populate: 'venue'
            });

            return artists.map(artist => ({
                id: artist._id.toString(),
                name: artist.artist_name,
                genre: artist.genre,
                venue: artist.venue, 
            }));
        },
    }
};

module.exports = resolvers;