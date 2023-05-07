"use client"

import Button, { ButtonStyle } from "@/components/Button";
import FileLoader from "@/components/FileLoader";
import Galary from "@/components/Galary";
import Input, { InputIcons } from "@/components/Input";
import Textarea from "@/components/Textarea";
import { COUNT_PLACEHOLDER, PROFESSION_PLACEHOLDER, SALARY_PLACEHOLDER, UPDATE_BTN_TEXT, VACANCY_PLACEHOLDER } from "@/constants/placeholders";
import { getVacancies } from "@/lib/getVacancies";
import { postVacancies } from "@/lib/postVacancies";
import { uploadFiles } from "@/lib/uploadFiles";
import { FormCategory, VacanciesConfig } from "@/typings";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { transliterate as tr } from 'transliteration';

export default function Admin() {
    enum InputsName {
        PROFESSION="profession",
        SALARY="salary",
        COUNT="count",
        DESCRIPTION="description",
        IMAGE="image",
        CATEGORY="category"
    }

    type FormInputs = {
        [InputsName.PROFESSION]: string,
        [InputsName.SALARY]: number,
        [InputsName.COUNT]: number,
        [InputsName.DESCRIPTION]: string,
        [InputsName.IMAGE]: {[key: number]: File},
        [InputsName.CATEGORY]: FormCategory
    }

    const {register, handleSubmit, setValue, getValues, control} = useForm<FormInputs>();
    const profession = useWatch({name: InputsName.PROFESSION, control});
    const galary = useWatch({name: InputsName.IMAGE, control});
    const [data, setData] = useState<VacanciesConfig>({});
    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        console.log(data);
        const vacancy: VacanciesConfig = {
            [data.profession]: {
                count: data.count,
                description: data.description,
                salary: data.salary,
                imagePath: `${tr(data.profession)}.jpg`
            }
        }
        // const formData = new FormData();
        // const files = Object.values(data.image);
        // files.forEach(file => {
        //     formData.append('files', file, file.name)
        // })

        // const fileName = await uploadFiles(formData, data.category);
        // console.log(fileName);
        const res = await postVacancies(vacancy)
        console.log(res);
    };



    useEffect(()=>{
        const getData = async () => {
            setData(await getVacancies());
        }

        if (Object.keys(data).length === 0)
        getData();
    })

    return (
        <div className="col-start-1 col-end-5 grid grid-cols-4 overflow-hidden">
            <form className="col-start-1 col-end-3 my-56 mx-10 flex flex-col gap-y-5" onSubmit={handleSubmit(onSubmit)}>
                <Input
                register={register(InputsName.PROFESSION)}
                placeholder={PROFESSION_PLACEHOLDER}
                icon={InputIcons.BRIEFCASE}
                type="select"
                options={Object.keys(data)}
                setValue={setValue}
                />
                <Input
                register={register(InputsName.SALARY)}
                placeholder={SALARY_PLACEHOLDER}
                icon={InputIcons.MONEY}
                type="number"
                defaultValue={data[profession]?.salary}
                />
                <Input
                register={register(InputsName.COUNT)}
                placeholder={COUNT_PLACEHOLDER}
                icon={InputIcons.USERS}
                type="number"
                defaultValue={data[profession]?.count}
                />
                <Textarea
                register={register(InputsName.DESCRIPTION)}
                placeholder={VACANCY_PLACEHOLDER}
                defaultValue={data[profession]?.description}
                />
                <FileLoader register={register(InputsName.IMAGE)} setValue={setValue} getValues={getValues} />
                <input {...register(InputsName.CATEGORY)} type="hidden" value={FormCategory.VACANCIES} />
                <Button text={UPDATE_BTN_TEXT} style={ButtonStyle.SIMPLE} type="submit" />
            </form>
            <div className="col-start-1 col-start-3 col-end-5 h-full">
                <Galary files={galary} />
            </div>
        </div>
    )
}