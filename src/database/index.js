const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/noderest', { useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
mongoose.Promise = require('bluebird');

module.exports = mongoose;
