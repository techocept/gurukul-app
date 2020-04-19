const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    fName: { type: String, required: true },
    lName: { type: String, default: null },
    status: { type: Number, default: 1 },
    updatedBy:{type: String, default:null},
    createdBy: {type: String, required:true},
    roleId:[
        {type: Schema.Types.ObjectId, ref: 'Roles'}
      ]
},{ timestamps:true});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Users', schema);