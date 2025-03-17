"use client"
import Image from "next/image";
import { redirect } from "next/navigation";
import React, {useState, useEffect} from "react";

interface IPokemon
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

export default function Home()
{
    document.addEventListener('contextmenu', (e) =>
    {
      e.preventDefault();
    })
    const [Pokemon, SetPokemon] = useState<IPokemon[]>([]);

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
    }, [])

    function Clickma(e : MouseEvent)
    {
        console.log(`Shift: ${e.shiftKey}\nCtrl: ${e.ctrlKey}\nMouse Button: ${e.button}`)
    }

    return (
        <div className="flex flex-col max-h-full">
        <div className="text-center">
            Bem-vindo ao Gigante
        </div>
        <div className="flex justify-between items-center flex-wrap gap-12 overflow-y-scroll px-36 mt-12 pb-12">
            {Pokemon.map((item, index) =>
            {
                return (
                    <div
                        key={index}
                        className="border-2 border-white bg-blue-400 rounded-lg w-48 h-60 flex text-white flex-col justify-center items-center relative"
                        onClick={(e) => Clickma(e.nativeEvent)}
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
