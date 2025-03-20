"use client"
import Image from "next/image";
import { redirect } from "next/navigation";
import React, {useState, useEffect} from "react";
import { clickSelection, doubleClickSelection, Selection } from "@/constants/selection";
import { randomInt } from "crypto";
import photo from "../136 - Copia.png"

interface IPokemonData
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
interface IPokemon
{
    id : number,
    pokedex : number,
    name : string,
    nickname : string,
    sprite : string,
    types : string[],
    height : number,
    weight : number,
    base_experience : number
}

export default function Home()
{
    const [Pokemon, SetPokemon] = useState<IPokemon[]>([]);
    const [Sel, SetSel] = useState<Selection<number, IPokemon>>(new Selection([]));
    const [Pkmn, SetPkmn] = useState<{name : string, sprite: string}>({name: "MissingNo.", sprite: photo.src});
    const [PkmnNum, SetPkmnNum] = useState<number>(Math.floor(Math.random() * 1024 + 1));

    useEffect(() =>
    {
        fetch
        (
            "http://localhost:8080/team",
            {
                method: "GET",
                headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`}
            }
        )
        .then((res) => (res.json()))
        .then((data) =>
        {
            SetPokemon(data);
        })
        

        fetch(`https://pokeapi.co/api/v2/pokemon/${PkmnNum}`)
        .then((res) => res.json())
        .then((data : IPokemonData) => SetPkmn({name: data.name, sprite: data.sprites.front_default}))
    }, [PkmnNum])

    function CAP()
    {
        fetch
        (
            "http://localhost:8080/capture",
            {
                method: "POST",
                headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json"},
                body: JSON.stringify({pkmn: PkmnNum})
            }
        )
        .then((res) => (res.json()))
        .then((data) =>
        {
            console.log(data.message)
        
            SetPkmnNum(Math.floor(Math.random() * 1024 + 1))
        })
    }

    console.log(Sel)
    return (
        <div className="flex flex-col max-h-full items-center">
        <div className="fixed flex justify-center py-2 border-b border-solid border-black w-full gap-4 bg-blue-400 h-18">
            <div className="flex flex-col">
                <p>Capture Pokemon:</p>
                <p className="font-bold">{Pkmn.name[0].toUpperCase() + Pkmn.name.substring(1)}</p>
            </div>
            <button className="bg-blue-600 border-2 border-white border-solid text-white p-2 hover:bg-blue-500 rounded-md" onClick={() => CAP()}>Throw ball</button>
        </div>
        <div className="flex justify-center items-center flex-wrap gap-12 overflow-y-scroll px-36 mt-18 py-12">
            {Pokemon.map((item, index) =>
            {
                return (
                    <div
                        key={index}
                        className={
                            `border-2 border-white rounded-lg w-48 h-60 flex text-white flex-col justify-center items-center relative `
                            + (Sel.set.has(item.id) ? "bg-blue-700" : "bg-blue-500")
                        }
                        onClick={(e) => SetSel(clickSelection(e, item, Sel, Pokemon, (p) => p.id))}
                        onDoubleClick={(e) => SetSel(doubleClickSelection(e, item, Sel, Pokemon, (p) => p.id, (p) => p.pokedex == Pokemon[index].pokedex))}
                    >
                        <p className="absolute top-2 left-2 unselectable">{item.pokedex}</p>
                        {
                            item.nickname === "" || item.nickname === item.name ?
                            <p className="text-lg unselectable">{item.name[0].toUpperCase() + item.name.substring(1)}</p> :
                            <>
                                <p className="text-lg unselectable">{item.nickname}</p>
                                <p className="text-sm unselectable">{item.name[0].toUpperCase() + item.name.substring(1)}</p>
                            </>
                        }
                        <div className="flex justify-center gap-2 unselectable">
                            {item.types.map(t => <p key={t}>{t[0].toUpperCase() + t.substring(1)}</p>)}
                        </div>
                        <Image src={item.sprite} alt={item.name} width={96} height={96} className="unselectable"/>
                        <p className="absolute bottom-2 left-2 unselectable">{item.weight/10} Kg</p>
                        <p className="absolute bottom-2 right-2 unselectable">{item.height/10} m</p>
                    </div>
                )
            })}
        </div>
        </div>
    );
}
