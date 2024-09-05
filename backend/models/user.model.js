import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 25
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // Kiểm tra số điện thoại phải là chuỗi 10 chữ số và bắt đầu bằng số 0
                return /^0\d{9}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        maxLength: 10
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum : ['student','recruiter'],
        required: true
    },
    profile: {
        bio: {type:String},
        skills: [{type:String}],
        resume: {type:String}, //URL to resume file
        resumeOriginalName: {type:String},
        company: {type:mongoose.Schema.Types.ObjectId, ref:'Company'}, 
        profilePhoto: {
            type:String,
            default: ""
        }, 
    }

},{timestamps: true});

export const User = mongoose.model('User', userSchema);