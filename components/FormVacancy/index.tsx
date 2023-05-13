"use client"

import Button, { ButtonStyle } from "@/components/Button";
import Input, { InputIcons } from "@/components/Input";
import Textarea from "@/components/Textarea";
import { ABOUT_ME_PLACEHOLDER, PHONE_PLACEHOLDER, RESUME_LINK_PLACEHOLDER, SEND_BTN_TEXT, USER_NAME_PLACEHOLDER, PROFESSION_PLACEHOLDER, ERORR_PHONE_MESSAGE, ERROR_FIO_MESSAGE } from "@/constants/placeholders";
import { SubmitHandler, useForm } from "react-hook-form";
import { getVacancies } from "@/lib/getVacancies";
import VacancyCard from "@/components/VacancyCard";
import { useEffect, useState } from "react";
import { VacanciesConfig } from "@/typings";
import FirstVisit from "../FirstVisit";

export default function FormVacancy() {
    enum InputsName {
        NAME="name",
        PROFESSION="profession",
        PHONE="phone",
        URL="url",
        DESCRIPTION="description",
    }
    type FormInputs = {
        [InputsName.NAME]: string,
        [InputsName.PROFESSION]: string,
        [InputsName.PHONE]: string,
        [InputsName.URL]?: string,
        [InputsName.DESCRIPTION]?: string
    }

    const {register, handleSubmit, setValue, formState: {errors}} = useForm<FormInputs>();
    const onSubmit: SubmitHandler<FormInputs> = data => console.log(data);
    const [vacancies, setVacancies] = useState<VacanciesConfig>({});

    useEffect(()=>{
        const getData = async () => {
            setVacancies(await getVacancies());
        }

        if (!Object.keys(vacancies).length)
            getData()
    })
    return (
        <>
            <div className="h-5/6 col-start-1 col-end-5 overflow-y-auto scrollbar grid grid-cols-2 justify-items-center pl-10 pr-10 mt-10 gap-5 max-md:grid-cols-1 max-md:col-end-7">
                {vacancies !== null ?
                Object.keys(vacancies).map(profession => {
                    const chooseVacancy = () => {
                        const form = document.querySelectorAll("form")[0];
                        const formTitle = form.children[0];
                        formTitle.innerHTML = `${PROFESSION_PLACEHOLDER}: ${profession}`;
                        setValue(InputsName.PROFESSION, profession);
                        if (form.style.display === "none")
                            form.style.display = "flex";
                    }
                    return (
                        <VacancyCard
                        key={profession}
                        title={profession}
                        salary={vacancies[profession].salary}
                        count={vacancies[profession].count}
                        description={vacancies[profession].description}
                        imagePath={vacancies[profession].imagePath}
                        click={chooseVacancy}
                        />
                    )
                }) : null}
            </div>
            <form
            className="col-start-5 col-end-7 my-56 flex flex-col gap-y-5 pl-14 max-md:before:inset-0 max-md:before:bg-gray-900 max-md:before:opacity-100 max-md:before:bg-clip-padding max-md:before:backdrop-filter max-md:before:backdrop-blur-xl max-md:before:bg-opacity-50 max-md:fixed max-md:left-0 max-md:top-0 max-md:before:w-screen max-md:before:h-screen max-md:before:content-[''] max-md:before:flex max-md:before:fixed max-md:before:left-0 max-md:before:top-0"
            onSubmit={handleSubmit(onSubmit)}
            style={{display: "none"}}
            >
                <h1 className="relative">{PROFESSION_PLACEHOLDER}</h1>
                <Input placeholder={USER_NAME_PLACEHOLDER} icon={InputIcons.USER} errors={errors} textHelper={ERROR_FIO_MESSAGE} register={register(InputsName.NAME, {required: true, validate: (value)=>value.split(" ").length === 3})}/>
                <Input placeholder={PHONE_PLACEHOLDER} type="tel" errors={errors} textHelper={ERORR_PHONE_MESSAGE} register={register(InputsName.PHONE, {required: true, pattern: /((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}/})}/>
                <Input placeholder={RESUME_LINK_PLACEHOLDER} type="url" register={register(InputsName.URL)}/>
                <Textarea placeholder={ABOUT_ME_PLACEHOLDER} register={register(InputsName.DESCRIPTION)}/>
                <Button text={SEND_BTN_TEXT} type="submit" style={ButtonStyle.CTA}/>
                <input {...register(InputsName.PROFESSION)} type="hidden" />
                <div className="relative hidden max-md:grid justify-self-center justify-items-center" onClick={()=>{const form = document.querySelectorAll("form")[0]; form.style.display = "none";}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </div>
            </form>
            <FirstVisit />
        </>
    )
}