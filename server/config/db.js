require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/user-create-app';

mongoose.set('useCreateIndex', true);

mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
    console.log('Connected to Mongo');
    },
    err => {
        /** handle initial connection error */ 
        console.log('error connecting to Mongo: ')
        console.log(err);
    }
);

module.exports = mongoose.connection;