const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    status: { type: String, required: true },
    lastUpatedOn:{type: Date, default: Date.now },
    lastUpdatedBy:{type: String, required:true},
    createdOn: { type: Date, default: Date.now },
    createdBy: {type: String, required:true},
    role_id:[
        {type: Schema.Types.ObjectId, ref: 'Roles'}
      ]
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Users', schema);