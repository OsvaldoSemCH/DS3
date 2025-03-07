import { IPokemonData } from "../dto/pokemon.ts";

export async function AttemptCapture(id : number) : Promise<IPokemonData | null>
{
    try
    {
        const Res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const Pkmn : IPokemonData = await Res.json() as IPokemonData;

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