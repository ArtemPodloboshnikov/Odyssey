"use client"

import Button, { ButtonStyle } from "@/components/Button";
import Input, { InputIcons } from "@/components/Input";
import Image from 'next/image'
import Textarea from "@/components/Textarea";
import { ABOUT_ME_PLACEHOLDER, DEFAULT_IMAGE, PHONE_PLACEHOLDER, RESUME_LINK_PLACEHOLDER, SEND_BTN_TEXT, USER_NAME_PLACEHOLDER } from "@/constants/placeholders";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function Vacancies() {
    enum InputsName {
        NAME="name",
        PHONE="phone",
        URL="url",
        DESCRIPTION="description",
    }
    type FormInputs = {
        [InputsName.NAME]: string,
        [InputsName.PHONE]: string,
        [InputsName.URL]?: string,
        [InputsName.DESCRIPTION]?: string,

    }
    type ImageType = {
        imagePath: string,
        alt: string
    };
    type VacanciesConfig = {
        [profession: string]: {
            title: string,
            count: number,
            salary: number,
            description: string,
            imagePath: string,
            alt: string
        }
    };
    const {register, handleSubmit} = useForm<FormInputs>();
    const onSubmit: SubmitHandler<FormInputs> = data => console.log(data);
    const [data, setData] = useState<VacanciesConfig>({});
    const [image, setImage] = useState<ImageType>();
    useEffect(()=>{
        async function getData() {
            const response = await fetch("http://localhost:3000/api/vacancies", {cache: "no-store"});
            const json = await response.json();
            setData(json);
        }

        getData()
    })
    return (
        <>
            <div className="relative col-start-1 col-end-3">
                <Image src={image?.imagePath||DEFAULT_IMAGE.path} alt={image?.alt||DEFAULT_IMAGE.alt} fill />
            </div>
            <div className="overflow-hidden col-start-3 col-end-5 p-10">
                {Object.keys(data).map(profession => {
                    const id = `id_${profession}`;
                    const changeImage = (e: any) => {
                        document.querySelectorAll("details").forEach(detail=>{if (detail.id !== id) detail.open = false})
                        const details: HTMLDetailsElement = document.getElementById(id) as HTMLDetailsElement
                        if (!details.open) {
                            details.open = true;
                            setImage({imagePath: data[profession].imagePath, alt: data[profession].alt});
                        } else {
                            details.open = false;
                            setImage({imagePath: "", alt: ""});
                        }
                    }
                    return (
                        <div key={profession} className="flex flex-col gap-y-6">
                        <Button text={data[profession].title} click={changeImage} />
                        <details className="w-fit" id={id}>
                            <summary className="hidden">{data[profession].title}</summary>
                            <div>
                                <span>Рабочих мест: {data[profession].count} з/п: {data[profession].salary}</span>
                                <p>{data[profession].description}</p>
                            </div>
                        </details>
                        </div>
                    )
                })}
            </div>
            <form className="col-start-5 col-end-7 my-56 flex flex-col gap-y-5" onSubmit={handleSubmit(onSubmit)}>
                <Input placeholder={USER_NAME_PLACEHOLDER} icon={InputIcons.USER} register={register(InputsName.NAME, {required: true})}/>
                <Input placeholder={PHONE_PLACEHOLDER} type="tel" register={register(InputsName.PHONE, {required: true})}/>
                <Input placeholder={RESUME_LINK_PLACEHOLDER} type="url" register={register(InputsName.URL)}/>
                <Textarea placeholder={ABOUT_ME_PLACEHOLDER} register={register(InputsName.DESCRIPTION)}/>
                <Button text={SEND_BTN_TEXT} type="submit" style={ButtonStyle.CTA}/>
            </form>
        </>
    )
}