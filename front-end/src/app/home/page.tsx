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
    const [Pokemon, SetPokemon] = useState<IPokemon[]>([]);
    const [Selection, SetSelection] = useState<Set<number>>(new Set([]));

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

    function Clickma(e : MouseEvent, index : number)
    {
        const Ctrl = e.ctrlKey
        const Shift = e.shiftKey

        if(Shift)
        {
            
        }else
        if(Ctrl)
        {
            if(Selection.has(index))
            {
                let S = new Set(Selection)
                S.delete(index)
                SetSelection(S);
                return
            }
            let S = new Set(Selection)
            S.add(index)
            SetSelection(S)
        }else
        {
            if(Selection.size == 1 && Selection.has(index))
            {
                SetSelection(new Set([]))
            }else
            {
                SetSelection(new Set([index]));
            }
        }
    }

    function DoubleClickma(e : MouseEvent, index : number)
    {
        const Ctrl = e.ctrlKey
        const Shift = e.shiftKey

        let List = new Set([index])
        let Comp = Pokemon[index].pokedex;

        for(let i = index + 1; i < Pokemon.length; ++i)
        {
            if(Pokemon[i].pokedex == Comp)
            {
                List.add(i)
            }else
            {
                break;
            }
        }

        if(Ctrl || Shift)
        {
            SetSelection(List.union(Selection))
        }else
        {
            SetSelection(List)
        }
    }

    console.log(Selection)
    return (
        <div className="flex flex-col max-h-full">
        <div className="text-center">
            Bem-vindo ao Gigante
        </div>
        <div className="flex justify-center items-center flex-wrap gap-12 overflow-y-scroll px-36 mt-12 pb-12">
            {Pokemon.map((item, index) =>
            {
                return (
                    <div
                        key={index}
                        className={
                            `border-2 border-white rounded-lg w-48 h-60 flex text-white flex-col justify-center items-center relative `
                            + (Selection.has(index) ? "bg-blue-600" : "bg-blue-400")
                        }
                        onClick={(e) => Clickma(e.nativeEvent, index)}
                        onDoubleClick={(e) => DoubleClickma(e.nativeEvent, index)}
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
