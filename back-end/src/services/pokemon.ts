import { ICaptureData, IPokemon, IPokemonData } from "../dto/pokemon.ts";
import { Request, Response, Router } from "express";
import { prisma } from "../lib/prisma.ts";

async function ApiCall(id : number) : Promise<IPokemon>
{
    const Res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    const Data : IPokemonData = (await Res.json()) as IPokemonData;

    const Pkmn : IPokemon = 
    {
        id: null,
        pokedex: Data.id,
        name: Data.name,
        nickname: "",
        sprite: Data.sprites.front_default,
        types: Data.types.map(t => t.type.name),
        height: Data.height,
        weight: Data.weight,
        base_experience: Data.base_experience,
    }
    return Pkmn;
}

export async function AttemptCapture(id : number) : Promise<IPokemon | null>
{
    try
    {
        const Pkmn = await ApiCall(id)
        const h = Pkmn.height / 10;
        const w = Pkmn.weight / 10;

        const Bmi = w / (h * h)
        const Exp = 1 / Math.sqrt(Pkmn.base_experience)

        const CapChance = ((100 / Bmi) * Exp)

        if(Math.random() < CapChance)
        {
            return Pkmn;
        }
    }catch
    {
        return null;
    }
    return null;
}

export async function Capture(PkmnId : number, TrainerId: number) : Promise<ICaptureData>
{
    let pkmn : IPokemon | null = await AttemptCapture(PkmnId)
    if(pkmn == null)
    {
        return {message: "Pokemon escaped", pkmn}
    }

    await prisma.pokemon.create({data: {Number: pkmn.pokedex, Nickname: pkmn.name, IdTrainer: TrainerId}})

    return {message: "Pokemon captured", pkmn}
}

export async function GetTeam(TrainerId : number) : Promise<IPokemon[]>
{
    const Data = await prisma.pokemon.findMany({where: {IdTrainer: TrainerId}});
    const Team : IPokemon[] = await Promise.all(Data.map(async p =>
    {
        let Pkmn = await ApiCall(p.Number);
        Pkmn.id = p.Id
        Pkmn.nickname = p.Nickname
        return Pkmn;
    }))

    return Team
}

export async function ChangeName(PkmnId : number, TrainerId : number, Nickname : string) : Promise<IPokemon | null>
{
    let Data = await prisma.pokemon.findUnique({where: {Id: PkmnId}});
    if(Data === null)
    {
        return null;
    }
    if(Data.IdTrainer !== TrainerId)
    {
        return null;
    }

    Data.Nickname = Nickname;

    let NewPkmn = await prisma.pokemon.update({where: {Id: Data.Id}, data: Data});
    let Pkmn = await ApiCall(NewPkmn.Number);
    Pkmn.id = NewPkmn.Id
    Pkmn.nickname = NewPkmn.Nickname
    return Pkmn;
}