const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    type: { type: String, required: true },
    status: {type: Number, default:1},
    createdBy: {type: String, required:true},
    updatedBy:{type: String, default:null},

},{ timestamps:true});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Roles', schema);