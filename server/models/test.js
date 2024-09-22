import {Schema, model} from 'mongoose';

const user = new Schema({
    name: {type: String, required: true},
    password: {type: String, required: true}
});

export default model('user', user);
