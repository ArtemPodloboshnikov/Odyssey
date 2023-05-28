"use client"

import Button, { ButtonStyle } from "@/components/Button";
import Input, { InputIcons } from "@/components/Input";
import Textarea from "@/components/Textarea";
import { ABOUT_ME_PLACEHOLDER, PHONE_PLACEHOLDER, RESUME_LINK_PLACEHOLDER, SEND_BTN_TEXT, USER_NAME_PLACEHOLDER, PROFESSION_PLACEHOLDER, ERORR_PHONE_MESSAGE, ERROR_FIO_MESSAGE } from "@/constants/placeholders";
import { SubmitHandler, useForm } from "react-hook-form";
import { getJSON } from "@/lib/getJSON";
import VacancyCard from "@/components/VacancyCard";
import { useEffect, useState } from "react";
import { SectionJsonTypes, VacanciesConfig } from "@/typings";
import { validateName, validatePhone } from "@/lib/validateFields";

export default function FormVacancy({id, title}:{id: string, title: string}) {
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
    const [currentRange, setCurrentRange] = useState<{start: number, end: number}>({start: 0, end: 3})
    const arrowClass = "w-12 h-12 self-center cursor-pointer";

    const leftArrow = () => {
        if (currentRange.start > 0)
          setCurrentRange(current=>({start: current.start-3, end: current.end-3}))
      }

      const rightArrow = () => {
        if (currentRange.end < Object.keys(vacancies).length)
          setCurrentRange(current=>({start: current.start+3, end: current.end+3}))
      }

    useEffect(()=>{
        const getData = async () => {
            setVacancies(await getJSON(SectionJsonTypes.VACANCIES));
        }

        if (!Object.keys(vacancies).length)
            getData()
    })

    const crossClick = ()=>{
        const form = document.querySelectorAll("form")[0];
        const body = document.getElementsByTagName("body")[0];
        form.style.display = "none";
        body.style.overflowY = "auto";
    }
    return (
        <>
            <div className="col-start-1 col-end-7 relative -mt-[100px]" id={id}></div>
            <div className="col-start-1 col-end-7 mt-10">
                <h1 className="text-4xl font-extrabold pl-64">{title.toUpperCase()}</h1>
                <div className="px-12 grid grid-cols-[1fr_2fr_2fr_2fr_1fr] justify-items-center scrollbar mt-5 gap-5 max-lg:grid-cols-1">
                <svg onClick={leftArrow} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${arrowClass} justify-self-end`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>

                    {vacancies !== null ?
                    Object.keys(vacancies).slice(currentRange.start, currentRange.end).map(profession => {
                        const chooseVacancy = () => {
                            const form = document.querySelectorAll("form")[0];
                            const body = document.getElementsByTagName("body")[0];
                            const formTitle = form.children[0];
                            formTitle.innerHTML = `${PROFESSION_PLACEHOLDER}: ${profession}`;
                            setValue(InputsName.PROFESSION, profession);
                            if (form.style.display === "none") {
                                form.style.display = "flex";
                                body.style.overflowY = "hidden";
                            }
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
                    <svg onClick={rightArrow} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${arrowClass} justify-self-start`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
            <form
            className="my-56 flex flex-col gap-y-5 px-[35%] before:inset-0 before:bg-gray-900 before:opacity-100 before:bg-clip-padding before:backdrop-filter before:backdrop-blur-xl before:bg-opacity-50 fixed max-lg:px-10 place-content-center w-screen left-0 top-0 before:w-screen before:h-screen before:content-[''] before:flex before:fixed before:left-0 before:top-0 z-[1001]"
            onSubmit={handleSubmit(onSubmit)}
            style={{display: "none"}}
            >
                <h1 className="relative">{PROFESSION_PLACEHOLDER}</h1>
                <Input placeholder={USER_NAME_PLACEHOLDER} icon={InputIcons.USER} errors={errors} textHelper={ERROR_FIO_MESSAGE} register={register(InputsName.NAME, {required: true, validate: (value)=>validateName(value)})}/>
                <Input placeholder={PHONE_PLACEHOLDER} type="tel" errors={errors} textHelper={ERORR_PHONE_MESSAGE} register={register(InputsName.PHONE, {required: true, validate: (value)=>validatePhone(value)})}/>
                <Input placeholder={RESUME_LINK_PLACEHOLDER} type="url" register={register(InputsName.URL)}/>
                <Textarea placeholder={ABOUT_ME_PLACEHOLDER} register={register(InputsName.DESCRIPTION)}/>
                <Button text={SEND_BTN_TEXT} type="submit" style={ButtonStyle.CTA}/>
                <input {...register(InputsName.PROFESSION)} type="hidden" />
                <div className="relative grid justify-self-center justify-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={crossClick} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 cursor-pointer max-lg:w-6 max-lg:h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </form>
        </>
    )
}