import { model, Schema } from 'mongoose';
import isemail from 'isemail';

// User Schema
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: v => isemail.validate(v),
            message: props => `${props.value} is not a valid email address`
        }
    },
    password: {
        type: String,
        default: null
    },
    photo: {
        type: String,
        default: null
    },
    createdAt: Date,
    updatedAt: Date,
}, {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
    versionKey: false,
    collection: 'user'
});

const Model = model('User', UserSchema);

export default Model;