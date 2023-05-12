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

            // Map the MongoDB documents to match the GraphQL schema
            return artists.map(artist => ({
                id: artist._id.toString(),
                name: artist.artist_name,
                genre: artist.genre,
                venue: artist.venue, // You might need to adjust this if `venue` is also an object with a different structure in MongoDB
            }));
        },
        // ...
    }
};

module.exports = resolvers;