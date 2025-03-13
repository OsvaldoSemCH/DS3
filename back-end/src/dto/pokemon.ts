export interface IPokemonData
{
    id : number,
    name : string,
    sprites : 
    {
        front_default : string
    },
    types : 
    {
        slot : number,
        type : {name : string}
    }[],
    height : number,
    weight : number,
    base_experience : number
}

export interface IPokemon
{
    id : number | null,
    pokedex : number,
    name : string,
    nickname : string,
    sprite : string,
    types : string[],
    height : number,
    weight : number,
    base_experience : number
}

export interface ICaptureData
{
    message : string
    pkmn : IPokemon | null
}

export interface INicknameData
{
    idPkmn : number,
    name : string
}