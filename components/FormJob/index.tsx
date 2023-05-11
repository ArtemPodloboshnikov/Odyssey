"use client"

import Button, { ButtonStyle } from "@/components/Button";
import FileLoader from "@/components/FileLoader";
import Galary from "@/components/Galary";
import Input, { InputIcons } from "@/components/Input";
import Textarea from "@/components/Textarea";
import { COUNT_PLACEHOLDER, PROFESSION_PLACEHOLDER, SALARY_PLACEHOLDER, UPDATE_BTN_TEXT, VACANCY_PLACEHOLDER } from "@/constants/placeholders";
import { getVacancies } from "@/lib/getVacancies";
import { postVacancies } from "@/lib/postVacancies";
import { putVacancies } from "@/lib/putVacancies";
import { uploadFiles } from "@/lib/uploadFiles";
import { FormCategory, VacanciesConfig } from "@/typings";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";

type FormJobProps = {
    setDialog: Dispatch<SetStateAction<{
        open: boolean;
        status: number;
    }>>
}

const FormJob: React.FC<FormJobProps> = ({setDialog}) => {
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
        [InputsName.IMAGE]: {[key: number]: File}
    }

    const {register, handleSubmit, setValue, getValues, control} = useForm<FormInputs>();
    const profession = useWatch({name: InputsName.PROFESSION, control});
    const galary = useWatch({name: InputsName.IMAGE, control});
    const [data, setData] = useState<VacanciesConfig>({});
    const onSubmit: SubmitHandler<FormInputs> = async (dataUpdate) => {
        const files = Object.values(dataUpdate.image);
        const vacancy: VacanciesConfig = {
            [dataUpdate.profession]: {
                count: dataUpdate.count||data[profession]?.count,
                description: dataUpdate.description||data[profession]?.description,
                salary: dataUpdate.salary||data[profession]?.salary,
                imagePath: files[0] ? `/images/professions/${files[0].name}` : data[profession]?.imagePath
            }
        }
        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file, file.name)
        })

        await uploadFiles(formData, FormCategory.VACANCIES);
        let res: number;
        if (data[dataUpdate.profession] !== undefined)
            res = await putVacancies(vacancy);
        else
            res = await postVacancies(vacancy);
        setDialog({open: true, status: res})
    };



    useEffect(()=>{
        const getData = async () => {
            setData(await getVacancies());
        }

        if (Object.keys(data).length === 0)
            getData();
    })
    return (
        <>
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
                register={register(InputsName.SALARY, {valueAsNumber: true, value: data[profession]?.salary})}
                placeholder={SALARY_PLACEHOLDER}
                icon={InputIcons.MONEY}
                type="number"
                defaultValue={data[profession]?.salary}
                />
                <Input
                register={register(InputsName.COUNT, {valueAsNumber: true, value: data[profession]?.count})}
                placeholder={COUNT_PLACEHOLDER}
                icon={InputIcons.USERS}
                type="number"
                defaultValue={data[profession]?.count}
                />
                <Textarea
                register={register(InputsName.DESCRIPTION, {value: data[profession]?.description})}
                placeholder={VACANCY_PLACEHOLDER}
                defaultValue={data[profession]?.description}
                />
                <FileLoader register={register(InputsName.IMAGE)} setValue={setValue} getValues={getValues} />
                <Button text={UPDATE_BTN_TEXT} style={ButtonStyle.SIMPLE} type="submit" />
            </form>
            <div className="col-start-1 col-start-3 col-end-5 h-full my-20">
                <Galary files={galary} />
            </div>
        </div>
        </>
    )
}

export default FormJob;