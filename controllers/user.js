import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const signup = async(req,res)=>{
    try{
        const {
            name,
            email,
            password,
            role
        } = req.body;
        let hashPassword = await bcrypt.hash(password,10);
        const user = await prisma.user.create({
            data:{
                name:name,
                email:email,
                password:hashPassword,
                role:role
            }
        })
        return res.status(200).json(user)
    }catch(err){
        console.log(err)
        return res.status(500).json({message:err})
    }
}

export const login = async(req,res)=>{
    try{
        const { email,password }  = req.body
        const user = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(!user){
            return res.status(402).json({message:"Users need to be registered"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " }) 
        console.log(user)
        const token = jwt.sign({ id: user._id }, "secret123");
        delete user.password;
        return res.status(200).json({token,user})
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
}

export const changePassword = async(req,res)=>{
    try{
        const {
            email,
            newPassword
        } = req.body;
        const updateUser = await prisma.user.update({
            where: {
              email:email
            },
            data: {
              password:newPassword 
            },
          })
        return res.status(200).json(updateUser)
    }catch(err){
        return res.status(500).json({message:err})
    }
}
