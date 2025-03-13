import { Request, Response } from "express";
import { Capture, ChangeName, GetTeam } from "../services/pokemon.ts";
import { INicknameData } from "../dto/pokemon.ts";

export class PkmnController
{
    static async Capture(req : Request, res : Response)
    {
        let Player = req.body.UserId;

        if(Player === undefined)
        {
            res.status(403)
            return;
        }

        const CaptureResult = await Capture(req.body.pkmn, Player);
        res.status(200).send(CaptureResult)
    }

    static async GetTeam(req : Request, res : Response)
    {
        let Player = req.body.UserId;

        if(Player === undefined)
        {
            res.status(403)
            return;
        }

        const Team = await GetTeam(Player);
        res.status(200).send(Team);
    }

    
    static async ChangeName(req : Request, res : Response)
    {
        let Player = req.body.UserId;
        let Data : INicknameData = req.body

        if(Player === undefined)
        {
            res.status(403)
            return;
        }

        const Result = await ChangeName(Data.idPkmn, Player, Data.name);
        if(Result === null)
        {
            res.status(400)
            return;
        }
        res.status(200).send(Result)
    }
}