const {
    Schema,
    model
} = require('mongoose');

const mongoose = require('mongoose');

const dotenv = require('dotenv').config();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;
const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose
    .connect(url, options)
    .then(db => console.log(`connected to: ${db.connection.name}`))
    .catch(err => console.error('connection error: ', err));

const facebookMsgSchema = new Schema({
    Email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        default: ''
    },
    like: {
        type: Number,
        default: 0
    }
}, {
    timestemps: true
})



const faceMsg = model('faceMsg', facebookMsgSchema);

module.exports = faceMsg