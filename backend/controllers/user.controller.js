import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                success: false, 
                message: "Some fields are missing." 
            });
        };
        const user = await User.findOne({email});
        if (user){
            return res.status(400).json({
                message: "User already exists.",
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
        });

        return res.status(201).json({
            message: "User created successfully.",
            success: true,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const {email,password,role} = req.body;   
        if (!email || !password || !role) {
            return res.status(400).json({
                success: false, 
                message: "Some fields are missing." 
            });
        };    
        let user = await User.findOne({email});
        if (!user){
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch){
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct
        if (user.role !== role){
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false,
            })
        };
        const tokenData = {
            userId: user._id,
        };
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: "1d"});
        
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpOnly: true, sameSite:'strict'}).json({
            message: `Login successful. Welcome back ${user.fullname}!`,
            user,
            success: true,
        });

    } catch (error) {
        console.log(error);
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message: "Logout successful.",
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateProfile = async (req, res) => {
    try {
        const {fullname, email, phoneNumber, bio, skills} = req.body;        
        const file = req.file;
        // cloudinary  
        const fileUri = getDataUri(file);
        let cloudResponse;
        try {
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        } catch (error) {
            return res.status(500).json({
                message: "Failed to upload file to Cloudinary.",
                success: false,
                error: error.message,
            });
        }
        

        let skillsArray;  
        if (skills){
            skillsArray = skills.split(",");
        }
         
        const userId = req.id; //middleware auth
        console.log(`User ID from request: ${userId}`);
        let user = await User.findById(userId);

        if (!user){
            return res.status(400).json({
                message: "User not found.",
                success: false,
            })
        }
        // update data
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        //resume comes later here...
        if (cloudResponse){
            user.profile.resume = cloudResponse.secure_url; //save the cloudinary url
            user.profile.resumeOriginalName = file.originalname; //save the original name
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true,
        });

    } catch (error) {
        console.log(error);
    }
};
