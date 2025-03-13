import { Request, Response, NextFunction } from "express";
import { IUser } from "../dto/player.ts";
import jwt from "jsonwebtoken";
import { INicknameData } from "../dto/pokemon.ts";

export function JwtFilter(req : Request, res : Response, next : NextFunction)
{
    const Headers = req.headers;
    if(Headers.authorization === undefined)
    {
        res.status(403).send({message: "Jogador não está logado"})
        return;
    }
    let Auth = Headers.authorization.replace('Bearer ', '');

    const Secret = process.env.SECRET;
    if(Secret == undefined)
    {
        res.status(500).send({message: "Something went really wrong"})
        return;
    }

    let {id} = jwt.verify(Auth, Secret) as {id: number}
    req.body.UserId = id;
    next();
}
export function VerifyNickname(req : Request, res : Response, next : NextFunction)
{
    const Data : INicknameData = req.body;
    if(!Data.idPkmn || !Data.name)
    {
        res.status(400).send({message: "Dados incompletos"})
        return;
    }
    next();
}

export function VerifyRegister(req : Request, res : Response, next : NextFunction)
{
    const Data : IUser = req.body;
    if(!Data.password || !Data.name)
    {
        res.status(400).send({message: "Dados incompletos"})
        return;
    }
    next();
}
export function VerifyLogin(req : Request, res : Response, next : NextFunction)
{
    const Data : IUser = req.body;
    if(!Data.password || !Data.name)
    {
        res.status(400).send({message: "Dados incompletos"})
        return;
    }
    next();
}