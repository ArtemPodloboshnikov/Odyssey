"use client"

import Button, { ButtonStyle } from "@/components/Button";
import FileLoader from "@/components/FileLoader";
import Galary from "@/components/Galary";
import Input, { InputIcons } from "@/components/Input";
import Textarea from "@/components/Textarea";
import { COUNT_PLACEHOLDER, ERROR_SALARY_MESSAGE, PROFESSION_PLACEHOLDER, SALARY_PLACEHOLDER, UPDATE_BTN_TEXT, VACANCY_PLACEHOLDER } from "@/constants/placeholders";
import { getJSON } from "@/lib/getJSON";
import { postVacancies } from "@/lib/postVacancies";
import { putVacancies } from "@/lib/putVacancies";
import { uploadFiles } from "@/lib/uploadFiles";
import { FormCategory, SectionJsonTypes, VacanciesConfig } from "@/typings";
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

    const {register, handleSubmit, setValue, getValues, formState: {errors}, control} = useForm<FormInputs>();
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
            setData(await getJSON(SectionJsonTypes.VACANCIES));
        }

        if (Object.keys(data).length === 0)
            getData();
    })
    return (
        <>
            <form className="h-fit col-start-1 col-end-3 mt-56 mx-10 flex flex-col gap-y-5 max-lg:col-end-5 max-lg:my-0 max-lg:mt-5" onSubmit={handleSubmit(onSubmit)}>
                <Input
                register={register(InputsName.PROFESSION, {required: true})}
                placeholder={PROFESSION_PLACEHOLDER}
                icon={InputIcons.BRIEFCASE}
                type="select"
                options={Object.keys(data)}
                setValue={setValue}
                />
                <Input
                register={register(InputsName.SALARY, {valueAsNumber: true, value: data[profession]?.salary, validate: (val)=>Number(val)>0, required: true})}
                placeholder={SALARY_PLACEHOLDER}
                icon={InputIcons.MONEY}
                type="number"
                defaultValue={data[profession]?.salary}
                errors={errors}
                textHelper={ERROR_SALARY_MESSAGE}
                min={1}
                />
                <Input
                register={register(InputsName.COUNT, {valueAsNumber: true, value: data[profession]?.count, required: true})}
                placeholder={COUNT_PLACEHOLDER}
                icon={InputIcons.USERS}
                type="number"
                defaultValue={data[profession]?.count}
                />
                <Textarea
                register={register(InputsName.DESCRIPTION, {value: data[profession]?.description, required: true})}
                placeholder={VACANCY_PLACEHOLDER}
                defaultValue={data[profession]?.description}
                />
                <FileLoader register={register(InputsName.IMAGE)} setValue={setValue} getValues={getValues} />
                <Button text={UPDATE_BTN_TEXT} style={ButtonStyle.SIMPLE} type="submit" />
            </form>
            <div className="col-start-3 col-end-5 h-[90vh] mt-20 max-lg:col-start-1 max-lg:col-end-5 max-lg:h-fit max-lg:my-5 max-lg:mx-6">
                <Galary files={galary} />
            </div>
        </>
    )
}

export default FormJob;