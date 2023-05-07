"use client"

import Button, { ButtonStyle } from "@/components/Button";
import Input, { InputIcons } from "@/components/Input";
import Textarea from "@/components/Textarea";
import { ABOUT_ME_PLACEHOLDER, PHONE_PLACEHOLDER, RESUME_LINK_PLACEHOLDER, SEND_BTN_TEXT, USER_NAME_PLACEHOLDER, PROFESSION_PLACEHOLDER } from "@/constants/placeholders";
import { SubmitHandler, useForm } from "react-hook-form";
import { getVacancies } from "@/lib/getVacancies";
import VacancyCard from "@/components/VacancyCard";

export default async function Vacancies() {
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

    const {register, handleSubmit, setValue} = useForm<FormInputs>();
    const onSubmit: SubmitHandler<FormInputs> = data => console.log(data);
    const vacancies = await getVacancies();

    return (
        <>
            <div className="h-full col-start-1 col-end-5 overflow-y-auto scrollbar grid grid-cols-2 justify-items-center pl-10 pr-10 mt-10 gap-5">
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
            <form className="col-start-5 col-end-7 my-56 flex flex-col gap-y-5 pl-14" onSubmit={handleSubmit(onSubmit)} style={{display: "none"}}>
                <h1>{PROFESSION_PLACEHOLDER}</h1>
                <Input placeholder={USER_NAME_PLACEHOLDER} icon={InputIcons.USER} register={register(InputsName.NAME, {required: true})}/>
                <Input placeholder={PHONE_PLACEHOLDER} type="tel" register={register(InputsName.PHONE, {required: true})}/>
                <Input placeholder={RESUME_LINK_PLACEHOLDER} type="url" register={register(InputsName.URL)}/>
                <Textarea placeholder={ABOUT_ME_PLACEHOLDER} register={register(InputsName.DESCRIPTION)}/>
                <Button text={SEND_BTN_TEXT} type="submit" style={ButtonStyle.CTA}/>
                <input {...register(InputsName.PROFESSION)} type="hidden" />
            </form>

        </>
    )
}