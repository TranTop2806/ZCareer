import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        // trim: true,
        maxLength: 100
    },
    description:{
        type: String,
        required: true,
    },
    requirements:[{
        type: String,
    }],
    salary:{
        type: Number,
        required: true,
    },
    experienceLevel:{
        type: Number,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    jobType:{
        type: String,
        required: true,
        enum : ['full-time','part-time','internship'],
    },
    position:{
        type: Number,
        required: true,
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }],
},{timestamps: true});


export const Job = mongoose.model('Job', jobSchema);