import { Request, Response } from "express";
import { IUser } from "../dto/player.ts";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { prisma } from "../lib/prisma.ts";

dotenv.config();

export default class AuthController
{
    static async Register(req: Request, res: Response): Promise<void>
    {
        const Data : IUser = req.body;

        Data.password = await bcrypt.hash(Data.password, await bcrypt.genSalt(12))
        try
        {
            await prisma.player.create({data: {Name: Data.name, Password: Data.password}})
            res.status(201).send({ message: "User created successfully" });
        }catch(error)
        {
            res.status(500).send({ message: `${error}` });
        }
    }

    static async Login(req: Request, res: Response): Promise<void>
    {
        const Data : IUser = req.body;
        const User = await prisma.player.findUnique({where: {Name: Data.name}});

        if(!User)
        {
            res.status(400).send({message:"Invalid Name or password"});
            return;
        }

        if(!await bcrypt.compare(Data.password, User.Password))
        {
            res.status(400).send({message:"Invalid Name or password"});
            return;
        }

        const Secret = process.env.SECRET;
        if(Secret == undefined)
        {
            res.status(500).send({message: "Something went really wrong"})
            return;
        }

        const Token = jwt.sign({id: User.Id,},Secret,{expiresIn:"2 years"});

        res.status(200).send({message: "Logged in successfully", token:Token});
    }
}