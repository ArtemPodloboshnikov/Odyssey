"use client"

import { Suspense } from "react";
import Loading from "./loading";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { MenuCardType } from "@/typings";
import DrinkCard from "@/components/MenuCard";

export default function Menu() {

    type MenuConfig = {
        [key: string]: MenuCardType[]
    };

    const [data, setData] = useState<MenuConfig|null>(null);
    const titlesDrinks = (data !== null ? Object.keys(data as Object) : []);
    const [section, setSection] = useState<string>("");
    useEffect(()=>{
        async function getData() {
            const response = await fetch("http://localhost:3000/api/menu", {cache: "no-store"});
            const json = await response.json();
            setData(json);
        }
        if (data === null)
            getData()
    })
    return (
        <Suspense fallback={<Loading/>}>
            <div className="overflow-hidden col-start-1 col-end-1 p-10 flex flex-col gap-y-5">
                { data !== null ?
                titlesDrinks.map(drinks => {
                    const changeDrink = () => {
                        setSection(drinks)
                    }
                    return <Button key={drinks} text={drinks} click={changeDrink} />
                }) : null}
            </div>
            <div className="overflow-y-auto scrollbar col-start-2 col-end-7 p-10 grid grid-cols-5 gap-5 h-fit">
                {data !== null && section !== "" ?
                    data[section].map(thing => {
                        return <DrinkCard
                                key={thing.title}
                                title={thing.title}
                                additional={thing.additional}
                                imagePath={thing.imagePath}
                                price={thing.price}
                                />
                    })
                : null}
            </div>
        </Suspense>
    )
}