const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    type: { type: String, required: true },
    lastUpatedOn:{type: Date, default: Date.now },
    lastUpdatedBy:{type: String, required:true},
    createdOn: { type: Date, default: Date.now },
    createdBy: {type: String, required:true},
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Roles', schema);