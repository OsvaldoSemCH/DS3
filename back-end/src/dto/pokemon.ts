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