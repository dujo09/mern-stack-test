const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.DB_URI;

const mongoClient = new MongoClient(uri, {
    serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    }
});

module.exports = {
    connectToMongoCluster: async function() {
        try {
            console.log('Connecting to MongoDB Atlas cluster...');

            await mongoClient.connect();
            await mongoClient.db("students").command({ ping: 1 });

            console.log('Successfully connected to MongoDB Atlas!');
        } catch (error) {
            console.error('Connection to MongoDB Atlas failed!', error);
            process.exit();
        }
    },

    getMongoClient: function() {
        return mongoClient;
    }
}