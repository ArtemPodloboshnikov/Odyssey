"use client"

import { Suspense } from "react";
import Loading from "./loading";
import Button, { ButtonStyle } from "@/components/Button";
import Input, { InputIcons } from "@/components/Input";
import Image from 'next/image'
import Textarea from "@/components/Textarea";
import { ABOUT_ME_PLACEHOLDER, DEFAULT_IMAGE, PHONE_PLACEHOLDER, RESUME_LINK_PLACEHOLDER, SEND_BTN_TEXT, USER_NAME_PLACEHOLDER } from "@/constants/placeholders";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ImageType } from "@/typings";

export default function Menu() {

    type CoctailsType = {
        title: string,
        ingredients: string,
        price: number
    } & ImageType;

    type MenuConfig = {
        coctails: CoctailsType[],
        shots: CoctailsType[]
    };

    type Drinks = keyof MenuConfig;

    const titlesDrinks: {[drink: string]: string} = {
        coctails: "Коктейли",
        shots: "Шоты"
    };

    const [data, setData] = useState<MenuConfig|null>(null);
    const dataKeys = (data !== null ? Object.keys(data as Object) : []) as Drinks[];
    const [drink, setDrink] = useState<Drinks>("coctails");
    useEffect(()=>{
        async function getData() {
            const response = await fetch("http://localhost:3000/api/menu", {cache: "no-store"});
            const json = await response.json();
            setData(json);
        }

        getData()
    })
    return (
        <Suspense fallback={<Loading/>}>
            <div className="overflow-hidden col-start-1 col-end-1 p-10 flex flex-col gap-y-5">
                { data !== null ?
                dataKeys.map(drinks => {
                    const changeDrink = () => {
                        setDrink(drinks)
                    }
                    return <Button key={drinks} text={titlesDrinks[drinks]} click={changeDrink} />
                }) : null}
            </div>
            <div className="overflow-hidden col-start-2 col-end-7 p-10 flex flex-row gap-x-5">
                {data !== null ?
                    data[drink].map(drinks => {
                        return <></>
                    })
                : null}
            </div>
        </Suspense>
    )
}