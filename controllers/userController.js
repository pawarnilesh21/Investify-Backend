import jwt from 'jsonwebtoken'
import User from "../models/User.js"
import express from "express"
import bcrypt from "bcrypt"

export const signup=async (req,res)=>{
    try {
        const {name,email,password}=req.body
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(409).json({error:"User Already Exist"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=new User({name:name,email:email,password:hashedPassword})
        await newUser.save()
        res.status(201).json({message:"User Created Successfully."})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.status(401).json({error:"Invalid Credentials."})
        }
        const isPassValid=await bcrypt.compare(password,user.password)
        if(!isPassValid){
            return res.status(401).json({error:"Invalid Credentials."})

        }
        const token=jwt.sign({
            id:user._id,email:user.email
        },process.env.JWT_SECRET)
        res.json({token})
    } catch (error) {
       res.status(500).json({ message: error.message });

    }
}

export const dashboard=async(req,res)=>{
    try {
        const user={
            id:req.user.id,
            email:req.user.email
        }
        res.json({
            message:"welcome to Dashboard"
        })
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

//need to make changes at frontend Dashboard.jsx
// also check directly /dashboard route =>need to test 
//i only write the code not tested..
