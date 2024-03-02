//Importing mongoose packages for connection
//Using destructuring to get connect and connection from the mongoose library
const {connect, connection} = require('mongoose');

//Instead of writing mongoose.connect we already attained connect from the monmgoose docs
connect('mongodb://localhost:27017/fluxDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

//Handling the different connection events
const db = connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected from MongoDB');
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

// Closing the connection when the application is exited
ProcessingInstruction.on('SIGINT', () => {
    connection.close(() => {
        console.log('Mongoose connection is disconnected due to application termination');
        process.exit(0);
    });
});
module.exports = connection;